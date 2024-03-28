import { z } from "zod";

import { productTypeAstNodeParser } from "../astNodes/productType";
import { sumTypeAstNodeParser } from "../astNodes/sumType";
import { functionTypeAstNodeParser } from "../astNodes/functionType";
import { genericTypeConstructorAstNodeParser } from "../astNodes/genericTypeConstructor";
import { genericTypeEliminatorAstNodeParser } from "../astNodes/genericTypeEliminator";
import { productTermConstructorAstNodeParser } from "../astNodes/productTermConstructor";
import { sumTermEliminatorAstNodeParser } from "../astNodes/sumTermEliminator";
import { lambdaConstructorAstNodeParser } from "../astNodes/lambdaConstructor";
import { functionTermEliminatorAstNodeParser } from "../astNodes/functionTermEliminator";
import { termDefinitionAstNodeParser } from "../astNodes/termDefinition";
import { normalizedTypeDefinitionAstNodeParser } from "../astNodes/typeDefinition";
import { libraryAstNodeParser } from "../astNodes/library";
import { AstNode } from "../generics";
import { AstNodeTypeUnknown } from "../nodeTypes";

export const nonTerminalAstNodeTypeUnknownParser = z.enum([
    "productType",
    "sumType",
    "functionType",
    "genericTypeConstructor",
    "genericTypeEliminator",
    "productTermConstructor",
    "sumTermEliminator",
    "lambdaConstructor",
    "functionTermEliminator",
    "termDefinition",
    "typeDefinition",
    "library",
] as const satisfies AstNodeTypeUnknown[]);

export type NonTerminalAstNodeTypeUnknown = z.infer<
    typeof nonTerminalAstNodeTypeUnknownParser
>;

export const nonTerminalAstNodeUnknownParser = z.discriminatedUnion("type", [
    productTypeAstNodeParser,
    sumTypeAstNodeParser,
    functionTypeAstNodeParser,
    genericTypeConstructorAstNodeParser,
    genericTypeEliminatorAstNodeParser,
    productTermConstructorAstNodeParser,
    sumTermEliminatorAstNodeParser,
    lambdaConstructorAstNodeParser,
    functionTermEliminatorAstNodeParser,
    termDefinitionAstNodeParser,
    normalizedTypeDefinitionAstNodeParser,
    libraryAstNodeParser,
] as const satisfies Array<
    // Had to add `Partial` here because typescript was freaking out
    z.ZodType<Partial<AstNode<NonTerminalAstNodeTypeUnknown, unknown>>>
>);

export type NonTerminalAstNodeUnknown = z.infer<
    typeof nonTerminalAstNodeUnknownParser
>;
