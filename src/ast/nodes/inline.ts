import { z } from "zod";

import { Deref } from "./deref";
import {
    AstNodeRefUnknown,
    AstNodeUnknown,
    astNodeRefUnknownParser,
    nonTerminalAstNodeParser,
} from "./parsers";

export type InlineResult = unknown & z.BRAND<"InlineResult">;

export const inline = (deref: Deref, val: unknown): InlineResult => {
    const refResult = astNodeRefUnknownParser.safeParse(val);
    if (refResult.success) {
        const astNode = deref(refResult.data);
        return inline(deref, astNode);
    }

    const nonTerminalResult = nonTerminalAstNodeParser.safeParse(val);
    if (nonTerminalResult.success) {
        const astNode = nonTerminalResult.data;

        const arrayResult = z.array(z.unknown()).safeParse(astNode.data);
        if (arrayResult.success) {
            const data = arrayResult.data.map((val) => inline(deref, val));

            return {
                ...astNode,
                data,
            } as unknown as InlineResult;
        }

        const dataRefRecordResult = z
            .record(z.string(), z.unknown())
            .safeParse(astNode.data);
        if (dataRefRecordResult.success) {
            const data = Object.fromEntries(
                Object.entries(dataRefRecordResult.data).map(([key, val]) => [
                    key,
                    inline(deref, val),
                ]),
            );

            return {
                ...astNode,
                data,
            } as unknown as InlineResult;
        }

        throw new Error(
            `Unrecognized data format; not ref array or ref record ${JSON.stringify(astNode)}`,
        );
    }

    return val as unknown as InlineResult;
};
