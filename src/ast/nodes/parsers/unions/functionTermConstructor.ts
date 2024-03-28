import { z } from "zod";

import { lambdaConstructorAstNodeParser } from "../astNodes/lambdaConstructor";
import { productTermEliminatorAstNodeParser } from "../astNodes/productTermEliminator";
import { sumTermEliminatorAstNodeParser } from "../astNodes/sumTermEliminator";
import { AstNode } from "../generics";
import { AstNodeTypeUnknown } from "../nodeTypes";

export const functionTermConstructorAstNodeTypeUnknownParser = z.enum([
    "lambdaConstructor",
    "productTermEliminator",
    "sumTermConstructor",
    "sumTermEliminator",
] as const satisfies AstNodeTypeUnknown[]);

export type FunctionTermConstructorAstNodeTypeUnknown = z.infer<
    typeof functionTermConstructorAstNodeTypeUnknownParser
>;

export const functionTermConstructorAstNodeUnknownParser = z.discriminatedUnion(
    "type",
    [
        lambdaConstructorAstNodeParser,
        productTermEliminatorAstNodeParser,
        sumTermEliminatorAstNodeParser,
        sumTermEliminatorAstNodeParser,
    ] as const satisfies Array<
        z.ZodType<AstNode<FunctionTermConstructorAstNodeTypeUnknown, unknown>>
    >,
);

export type FunctionTermConstructorAstNodeUnknown = z.infer<
    typeof functionTermConstructorAstNodeUnknownParser
>;
