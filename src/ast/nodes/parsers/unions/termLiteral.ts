import { z } from "zod";

import { booleanTermLiteralAstNodeParser } from "../astNodes/booleanTermLiteral";
import { floatTermLiteralAstNodeParser } from "../astNodes/floatTermLiteral";
import { integerTermLiteralAstNodeParser } from "../astNodes/integerTermLiteral";
import { stringTermLiteralAstNodeParser } from "../astNodes/stringTermLiteral";
import { AstNode } from "../generics";
import { AstNodeTypeUnknown } from "../nodeTypes";

export const termLiteralAstNodeTypeUnknownParser = z.enum([
    "booleanTermLiteral",
    "floatTermLiteral",
    "integerTermLiteral",
    "stringTermLiteral",
] as const satisfies AstNodeTypeUnknown[]);

export type TermLiteralAstNodeTypeUnknown = z.infer<
    typeof termLiteralAstNodeTypeUnknownParser
>;

export const termLiteralAstNodeUnknownParser = z.discriminatedUnion("type", [
    booleanTermLiteralAstNodeParser,
    floatTermLiteralAstNodeParser,
    integerTermLiteralAstNodeParser,
    stringTermLiteralAstNodeParser,
] as const satisfies Array<
    z.ZodType<AstNode<TermLiteralAstNodeTypeUnknown, unknown>>
>);

export type TermLiteralAstNodeUnknown = z.infer<
    typeof termLiteralAstNodeUnknownParser
>;
