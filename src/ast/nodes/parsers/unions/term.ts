import { z } from "zod";

import {
    functionTermConstructorAstNodeTypeUnknownParser,
    functionTermConstructorAstNodeUnknownParser,
} from "./functionTermConstructor";
import {
    termLiteralAstNodeTypeUnknownParser,
    termLiteralAstNodeUnknownParser,
} from "./termLiteral";
import { termReferenceAstNodeParser } from "../astNodes/termReference";
import { productTermConstructorAstNodeParser } from "../astNodes/productTermConstructor";
import { functionTermEliminatorAstNodeParser } from "../astNodes/functionTermEliminator";
import { AstNode } from "../generics";
import { AstNodeTypeUnknown } from "../nodeTypes";

export const termAstNodeTypeUnknownParser = z.enum([
    ...termLiteralAstNodeTypeUnknownParser.options,
    "termReference",
    "productTermConstructor",
    ...functionTermConstructorAstNodeTypeUnknownParser.options,
    "functionTermEliminator",
] as const satisfies AstNodeTypeUnknown[]);

export type TermAstNodeTypeUnknown = z.infer<
    typeof termAstNodeTypeUnknownParser
>;

export const termAstNodeUnknownParser = z.discriminatedUnion("type", [
    ...termLiteralAstNodeUnknownParser.options,
    termReferenceAstNodeParser,
    productTermConstructorAstNodeParser,
    ...functionTermConstructorAstNodeUnknownParser.options,
    functionTermEliminatorAstNodeParser,
] as const satisfies Array<
    z.ZodType<AstNode<TermAstNodeTypeUnknown, unknown>>
>);

export type TermAstNodeUnknown = z.infer<typeof termAstNodeUnknownParser>;
