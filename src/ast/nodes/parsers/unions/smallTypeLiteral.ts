import { z } from "zod";

import { booleanTypeLiteralAstNodeParser } from "../astNodes/booleanTypeLiteral";
import { floatTypeLiteralAstNodeParser } from "../astNodes/floatTypeLiteral";
import { integerTypeLiteralAstNodeParser } from "../astNodes/integerTypeLiteral";
import { stringTypeLiteralAstNodeParser } from "../astNodes/stringTypeLiteral";
import { AstNode } from "../generics";
import { AstNodeTypeUnknown } from "../nodeTypes";

export const smallTypeLiteralAstNodeTypeUnknownParser = z.enum([
    "booleanTypeLiteral",
    "floatTypeLiteral",
    "integerTypeLiteral",
    "stringTypeLiteral",
] as const satisfies AstNodeTypeUnknown[]);

export type SmallTypeLiteralAstNodeTypeUnknown = z.infer<
    typeof smallTypeLiteralAstNodeTypeUnknownParser
>;

export const smallTypeLiteralAstNodeUnknownParser = z.discriminatedUnion(
    "type",
    [
        booleanTypeLiteralAstNodeParser,
        floatTypeLiteralAstNodeParser,
        integerTypeLiteralAstNodeParser,
        stringTypeLiteralAstNodeParser,
    ] as const satisfies Array<
        // Had to add `Partial` here because typescript was freaking out
        z.ZodType<Partial<AstNode<SmallTypeLiteralAstNodeTypeUnknown, unknown>>>
    >,
);

export type SmallTypeLiteralAstNodeUnknown = z.infer<
    typeof smallTypeLiteralAstNodeUnknownParser
>;
