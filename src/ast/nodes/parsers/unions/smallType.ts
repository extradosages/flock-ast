import { z } from "zod";

import {
    smallTypeLiteralAstNodeTypeUnknownParser,
    smallTypeLiteralAstNodeUnknownParser,
} from "./smallTypeLiteral";
import { typeReferenceAstNodeParser } from "../astNodes/typeReference";
import { productTypeAstNodeParser } from "../astNodes/productType";
import { sumTypeAstNodeParser } from "../astNodes/sumType";
import { functionTypeAstNodeParser } from "../astNodes/functionType";
import { genericTypeEliminatorAstNodeParser } from "../astNodes/genericTypeEliminator";
import { AstNode } from "../generics";
import { AstNodeTypeUnknown } from "../nodeTypes";

export const smallTypeAstNodeTypeUnknownParser = z.enum([
    ...smallTypeLiteralAstNodeTypeUnknownParser.options,
    "typeReference",
    "productType",
    "sumType",
    "functionType",
    "genericTypeEliminator",
] as const satisfies AstNodeTypeUnknown[]);

export type SmallTypeAstNodeTypeUnknown = z.infer<
    typeof smallTypeAstNodeTypeUnknownParser
>;

export const smallTypeAstNodeUnknownParser = z.discriminatedUnion("type", [
    ...smallTypeLiteralAstNodeUnknownParser.options,
    typeReferenceAstNodeParser,
    productTypeAstNodeParser,
    sumTypeAstNodeParser,
    functionTypeAstNodeParser,
    genericTypeEliminatorAstNodeParser,
] as const satisfies Array<
    // Had to add `Partial` here because typescript was freaking out
    z.ZodType<Partial<AstNode<SmallTypeAstNodeTypeUnknown, unknown>>>
>);

export type SmallTypeAstNodeUnknown = z.infer<
    typeof smallTypeAstNodeUnknownParser
>;
