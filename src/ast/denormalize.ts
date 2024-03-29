import { z } from "zod";

import { Deref, astNodeRefUnknownParser } from "./nodes";

export const denormalize = (deref: Deref, val: unknown): unknown => {
    debugger;
    const refResult = astNodeRefUnknownParser.safeParse(val);
    if (refResult.success) {
        const astNode = deref(refResult.data);
        return denormalize(deref, astNode);
    }
    const zz = z;

    const dataResult = z
        .object({ data: z.unknown() })
        .passthrough()
        .refine((val) => val.data !== undefined)
        .safeParse(val);
    if (dataResult.success) {
        const parsed = dataResult.data;
        const data = denormalize(deref, parsed.data);

        return {
            ...parsed,
            data,
        };
    }

    const arrayResult = z.array(z.unknown()).safeParse(val);
    if (arrayResult.success) {
        const data = arrayResult.data.map((val) => denormalize(deref, val));
        return data;
    }

    const recordResult = z.record(z.string(), z.unknown()).safeParse(val);
    if (recordResult.success) {
        const data = Object.fromEntries(
            Object.entries(recordResult.data).map(([key, val]) => [
                key,
                denormalize(deref, val),
            ]),
        );

        return data;
    }

    return val;
};
