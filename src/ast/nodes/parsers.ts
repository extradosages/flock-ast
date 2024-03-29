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

export const astNodeTypeParser = <AstNodeType extends AstNodeTypeUnknown>(
    astNodeType: AstNodeType,
) => z.literal(astNodeType);

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

export const smallTypeLiteralAstNodeTypeParser = z.enum([
    "booleanTypeLiteral",
    "floatTypeLiteral",
    "integerTypeLiteral",
    "stringTypeLiteral",
] as const satisfies AstNodeTypeUnknown[]);

export type SmallTypeLiteralAstNodeTypeUnknown = z.infer<
    typeof smallTypeLiteralAstNodeTypeParser
>;

export const smallTypeAstNodeTypeParser = z.enum([
    ...smallTypeLiteralAstNodeTypeParser.options,
    "typeReference",
    "productType",
    "sumType",
    "functionType",
    "genericTypeEliminator",
] as const satisfies AstNodeTypeUnknown[]);

export type SmallTypeAstNodeTypeUnknown = z.infer<
    typeof smallTypeAstNodeTypeParser
>;

export const largeTypeAstNodeTypeParser = z.enum([
    ...smallTypeAstNodeTypeParser.options,
    "genericTypeConstructor",
] as const satisfies AstNodeTypeUnknown[]);

export type LargeTypeAstNodeTypeUnknown = z.infer<
    typeof largeTypeAstNodeTypeParser
>;

export const termLiteralAstNodeTypeParser = z.enum([
    "booleanTermLiteral",
    "floatTermLiteral",
    "integerTermLiteral",
    "stringTermLiteral",
] as const satisfies AstNodeTypeUnknown[]);

export type TermLiteralAstNodeTypeUnknown = z.infer<
    typeof termLiteralAstNodeTypeParser
>;

export const functionTermConstructorAstNodeTypeParser = z.enum([
    "lambdaConstructor",
    "productTermEliminator",
    "sumTermConstructor",
    "sumTermEliminator",
] as const satisfies AstNodeTypeUnknown[]);

export type FunctionTermConstructorAstNodeTypeUnknown = z.infer<
    typeof functionTermConstructorAstNodeTypeParser
>;

export const termAstNodeTypeParser = z.enum([
    ...termLiteralAstNodeTypeParser.options,
    "termReference",
    "productTermConstructor",
    ...functionTermConstructorAstNodeTypeParser.options,
    "functionTermEliminator",
] as const satisfies AstNodeTypeUnknown[]);

export type TermAstNodeTypeUnknown = z.infer<typeof termAstNodeTypeParser>;

export const astNodeRefParser = <AstNodeType extends AstNodeTypeUnknown>(
    astNodeType: z.ZodType<AstNodeType>,
) =>
    z
        .object({
            id: z.string(),
            type: astNodeType,
        })
        .strict();

export type AstNodeRef<AstNodeType extends AstNodeTypeUnknown> = {
    id: string;
    type: AstNodeType;
};

export const astNodeRefUnknownParser = astNodeRefParser(
    astNodeTypeUnknownParser,
);

export type AstNodeRefUnknown = z.infer<typeof astNodeRefUnknownParser>;

const astNodeTypeToDataParserRecord = {
    booleanTermLiteral: z.boolean(),
    booleanTypeLiteral: z.undefined(),
    clientImplementation: z.undefined(),
    floatTermLiteral: z.number(),
    floatTypeLiteral: z.undefined(),
    functionTermEliminator: z.object({
        arguments: z.array(astNodeRefParser(termAstNodeTypeParser)),
        function: z.union([
            astNodeRefParser(z.literal("termReference")),
            astNodeRefParser(functionTermConstructorAstNodeTypeParser),
        ]),
    }),
    functionType: z.object({
        codomain: astNodeRefParser(smallTypeAstNodeTypeParser),
        domains: z.array(astNodeRefParser(smallTypeAstNodeTypeParser)),
    }),
    genericTypeConstructor: z.object({
        codomainType: astNodeRefParser(smallTypeAstNodeTypeParser),
        domainBindings: z.array(astNodeRefParser(z.literal("typeBinding"))),
    }),
    genericTypeEliminator: z.object({
        arguments: z.array(astNodeRefParser(smallTypeAstNodeTypeParser)),
        function: z.union([
            astNodeRefParser(z.literal("typeReference")),
            astNodeRefParser(z.literal("genericTypeConstructor")),
        ]),
    }),
    integerTermLiteral: z.number().int(),
    integerTypeLiteral: z.undefined(),
    largeTypeTypeLiteral: z.undefined(),
    lambdaConstructor: z.object({
        codomainTerm: astNodeRefParser(termAstNodeTypeParser),
        domainBindings: z.array(astNodeRefParser(z.literal("termBinding"))),
    }),
    library: z.object({
        termDefinitions: z.array(astNodeRefParser(z.literal("termDefinition"))),
        typeDefinitions: z.array(astNodeRefParser(z.literal("typeDefinition"))),
    }),
    productTermConstructor: z.array(astNodeRefParser(termAstNodeTypeParser)),
    productTermEliminator: z.number().int(),
    productType: z.array(astNodeRefParser(smallTypeAstNodeTypeParser)),
    sumTermConstructor: z.number().int(),
    sumTermEliminator: z.array(astNodeRefParser(termAstNodeTypeParser)),
    sumType: z.array(astNodeRefParser(smallTypeAstNodeTypeParser)),
    stringTermLiteral: z.string(),
    stringTypeLiteral: z.undefined(),
    termBinding: z.string(),
    termDefinition: z.object({
        binding: astNodeRefParser(z.literal("termBinding")),
        term: z.union([
            astNodeRefParser(termAstNodeTypeParser),
            astNodeRefParser(z.literal("clientImplementation")),
        ]),
        type: astNodeRefParser(largeTypeAstNodeTypeParser),
    }),
    termReference: z.string(),
    typeBinding: z.string(),
    typeDefinition: z.object({
        binding: astNodeRefParser(z.literal("typeBinding")),
        type: astNodeRefParser(largeTypeAstNodeTypeParser),
    }),
    typeReference: z.string(),
} as const satisfies Record<AstNodeTypeUnknown, z.ZodType<unknown>>;

export const astNodeDataParser = <AstNodeType extends AstNodeTypeUnknown>(
    astNodeType: AstNodeType,
) => astNodeTypeToDataParserRecord[astNodeType];

export type AstNodeData<AstNodeType extends AstNodeTypeUnknown> = z.infer<
    (typeof astNodeTypeToDataParserRecord)[AstNodeType]
>;

export type AstNodeDataUnknown = AstNodeData<AstNodeTypeUnknown>;

export const astNodeParser = <AstNodeType extends AstNodeTypeUnknown>(
    astNodeType: AstNodeType,
) =>
    z.object({
        data: astNodeDataParser(astNodeType),
        id: z.string(),
        type: astNodeTypeParser(astNodeType),
    });

export type AstNode<AstNodeType extends AstNodeTypeUnknown> = {
    data: AstNodeData<AstNodeType>;
    id: string;
    type: AstNodeType;
};

export type AstNodeUnknown = AstNode<AstNodeTypeUnknown>;

export const astNodeUnionParser = <AstNodeTypes extends AstNodeTypeUnknown[]>(
    astNodeTypes: AstNodeTypes,
) => {
    if (astNodeTypes.length === 0) {
        throw new Error(
            "Can't construct a node union parser without specifying types",
        );
    }
    let parser = undefined;
    for (const astNodeType of astNodeTypes) {
        if (parser === undefined) {
            parser = astNodeParser(astNodeType);
        } else {
            parser = parser.or(astNodeParser(astNodeType));
        }
    }
    return parser as z.ZodType<AstNode<AstNodeTypes[number]>>;
};

export const nonTerminalAstNodeParser = astNodeUnionParser(
    nonTerminalAstNodeTypeUnknownParser.options,
);

export type NonTerminalAstNodeUnknown = z.infer<
    typeof nonTerminalAstNodeParser
>;

export const smallTypeLiteralAstNodeParser = astNodeUnionParser(
    smallTypeLiteralAstNodeTypeParser.options,
);

export type SmallTypeLiteralAstNodeUnknown = z.infer<
    typeof smallTypeLiteralAstNodeParser
>;

export const smallTypeAstNodeParser = astNodeUnionParser(
    smallTypeAstNodeTypeParser.options,
);

export type SmallTypeAstNodeUnknown = z.infer<typeof smallTypeAstNodeParser>;

export const largeTypeAstNodeParser = astNodeUnionParser(
    largeTypeAstNodeTypeParser.options,
);

export type LargeTypeAstNodeUnknown = z.infer<typeof largeTypeAstNodeParser>;

export const termLiteralAstNodeParser = astNodeUnionParser(
    termLiteralAstNodeTypeParser.options,
);

export type TermLiteralAstNodeUnknown = z.infer<
    typeof termLiteralAstNodeParser
>;

export const functionTermConstructorAstNodeParser = astNodeUnionParser(
    functionTermConstructorAstNodeTypeParser.options,
);

export type FunctionTermConstructorAstNodeUnknown = z.infer<
    typeof functionTermConstructorAstNodeParser
>;

export const termAstNodeParser = astNodeUnionParser(
    termAstNodeTypeParser.options,
);

export type TermAstNodeUnknown = z.infer<typeof termAstNodeParser>;

export const booleanTermLiteralAstNodeParser =
    astNodeParser("booleanTermLiteral");

export type BooleanTermLiteralAstNode = z.infer<
    typeof booleanTermLiteralAstNodeParser
>;

export const booleanTypeLiteralAstNodeParser =
    astNodeParser("booleanTypeLiteral");

export type BooleanTypeLiteralAstNode = z.infer<
    typeof booleanTypeLiteralAstNodeParser
>;

export const clientImplementationAstNodeParser = astNodeParser(
    "clientImplementation",
);

export type ClientImplementationAstNode = z.infer<
    typeof clientImplementationAstNodeParser
>;

export const floatTermLiteralAstNodeParser = astNodeParser("floatTermLiteral");

export type FloatTermLiteralAstNode = z.infer<
    typeof floatTermLiteralAstNodeParser
>;

export const floatTypeLiteralAstNodeParser = astNodeParser("floatTypeLiteral");

export type FloatTypeLiteralAstNode = z.infer<
    typeof floatTypeLiteralAstNodeParser
>;

export const functionTypeAstNodeParser = astNodeParser("functionType");

export type FunctionTypeAstNode = z.infer<typeof functionTypeAstNodeParser>;

export const genericTypeConstructorAstNodeParser = astNodeParser(
    "genericTypeConstructor",
);

export type GenericTypeConstructorAstNode = z.infer<
    typeof genericTypeConstructorAstNodeParser
>;

export const genericTypeEliminatorAstNodeParser = astNodeParser(
    "genericTypeEliminator",
);

export type GenericTypeEliminatorAstNode = z.infer<
    typeof genericTypeEliminatorAstNodeParser
>;

export const integerTermLiteralAstNodeParser =
    astNodeParser("integerTermLiteral");

export type IntegerTermLiteralAstNode = z.infer<
    typeof integerTermLiteralAstNodeParser
>;

export const integerTypeLiteralAstNodeParser =
    astNodeParser("integerTypeLiteral");

export type IntegerTypeLiteralAstNode = z.infer<
    typeof integerTypeLiteralAstNodeParser
>;

export const lambdaConstructorAstNodeParser =
    astNodeParser("lambdaConstructor");

export type LambdaConstructorAstNode = z.infer<
    typeof lambdaConstructorAstNodeParser
>;

export const largeTypeTypeLiteralAstNodeParser = astNodeParser(
    "largeTypeTypeLiteral",
);

export type LargeTypeTypeLiteralAstNode = z.infer<
    typeof largeTypeTypeLiteralAstNodeParser
>;

export const libraryAstNodeParser = astNodeParser("library");

export type LibraryAstNode = z.infer<typeof libraryAstNodeParser>;

export const productTermConstructorAstNodeParser = astNodeParser(
    "productTermConstructor",
);

export type ProductTermConstructorAstNode = z.infer<
    typeof productTermConstructorAstNodeParser
>;

export const productTermEliminatorAstNodeParser = astNodeParser(
    "productTermEliminator",
);

export type ProductTermEliminatorAstNode = z.infer<
    typeof productTermEliminatorAstNodeParser
>;

export const productTypeAstNodeParser = astNodeParser("productType");

export type ProductTypeAstNode = z.infer<typeof productTypeAstNodeParser>;

export const sumTermConstructorAstNodeParser =
    astNodeParser("sumTermConstructor");

export type SumTermConstructorAstNode = z.infer<
    typeof sumTermConstructorAstNodeParser
>;

export const sumTermEliminatorAstNodeParser =
    astNodeParser("sumTermEliminator");

export type SumTermEliminatorAstNode = z.infer<
    typeof sumTermEliminatorAstNodeParser
>;

export const sumTypeAstNodeParser = astNodeParser("sumType");

export type SumTypeAstNode = z.infer<typeof sumTypeAstNodeParser>;

export const stringTermLiteralAstNodeParser =
    astNodeParser("stringTermLiteral");

export type StringTermLiteralAstNode = z.infer<
    typeof stringTermLiteralAstNodeParser
>;

export const stringTypeLiteralAstNodeParser =
    astNodeParser("stringTypeLiteral");

export type StringTypeLiteralAstNode = z.infer<
    typeof stringTypeLiteralAstNodeParser
>;

export const termBindingAstNodeParser = astNodeParser("termBinding");

export type TermBindingAstNode = z.infer<typeof termBindingAstNodeParser>;

export const termDefinitionAstNodeParser = astNodeParser("termDefinition");

export type TermDefinitionAstNode = z.infer<typeof termDefinitionAstNodeParser>;

export const termReferenceAstNodeParser = astNodeParser("termReference");

export type TermReferenceAstNode = z.infer<typeof termReferenceAstNodeParser>;

export const typeBindingAstNodeParser = astNodeParser("typeBinding");

export type TypeBindingAstNode = z.infer<typeof typeBindingAstNodeParser>;

export const typeDefinitionAstNodeParser = astNodeParser("typeDefinition");

export type TypeDefinitionAstNode = z.infer<typeof typeDefinitionAstNodeParser>;

export const typeReferenceAstNodeParser = astNodeParser("typeReference");

export type TypeReferenceAstNode = z.infer<typeof typeReferenceAstNodeParser>;
