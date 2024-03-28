import { z } from "zod";

export const astNodeTypeUnknownParser = z.enum([
    "booleanTypeLiteral",
    "floatTypeLiteral",
    "integerTypeLiteral",
    "stringTypeLiteral",
    "largeTypeTypeLiteral",
    "typeBinding",
    "typeReference",
    "productType",
    "sumType",
    "functionType",
    "genericTypeConstructor",
    "genericTypeEliminator",
    "booleanTermLiteral",
    "floatTermLiteral",
    "integerTermLiteral",
    "stringTermLiteral",
    "clientImplementation",
    "termBinding",
    "termReference",
    "productTermConstructor",
    "productTermEliminator",
    "sumTermConstructor",
    "sumTermEliminator",
    "lambdaConstructor",
    "functionTermEliminator",
    "termDefinition",
    "typeDefinition",
    "library",
]);

export type AstNodeTypeUnknown = z.infer<typeof astNodeTypeUnknownParser>;
