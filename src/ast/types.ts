import { z } from "zod";

// Helper
export type AstNodeParser<Node extends string, Data> = z.ZodObject<{
    node: z.ZodLiteral<Node>;
    data: z.ZodType<Data>;
}>;

export type AstNode<Node extends string, Data> = {
    node: Node;
    data: Data;
};

const astNodeParser = <Node extends string, Data>(
    node: Node,
    data: z.ZodType<Data>,
): AstNodeParser<Node, Data> =>
    z.object({
        node: z.literal(node),
        data: data,
    });

// ## Types
export type SmallType =
    | SmallTypeLiteral
    | TypeReference
    | ProductType
    | SumType
    | FunctionType
    | GenericTypeEliminator;

/**
 * Unsafe since component type `unsafeTypeReference` is unsafe.
 */
export const unsafeSmallTypeParser: z.ZodType<SmallType> = z.lazy(() =>
    z.union([
        smallTypeLiteralParser,
        unsafeTypeReferenceParser,
        productTypeParser,
        sumTypeParser,
        functionTypeParser,
        genericTypeEliminatorParser,
    ]),
);

export const booleanTypeLiteralParser = astNodeParser(
    "booleanTypeLiteral",
    z.undefined(),
);

export type BooleanTypeLiteral = z.infer<typeof booleanTypeLiteralParser>;

export const floatTypeLiteralParser = astNodeParser(
    "floatTypeLiteral",
    z.undefined(),
);

export type FloatTypeLiteral = z.infer<typeof floatTypeLiteralParser>;

export const integerTypeLiteralParser = astNodeParser(
    "integerTypeLiteral",
    z.undefined(),
);

export type IntegerTypeLiteral = z.infer<typeof integerTypeLiteralParser>;

export const stringTypeLiteralParser = astNodeParser(
    "stringTypeLiteral",
    z.undefined(),
);

export type StringTypeLiteral = z.infer<typeof stringTypeLiteralParser>;

export const smallTypeLiteralParser = z.union([
    booleanTypeLiteralParser,
    floatTypeLiteralParser,
    integerTypeLiteralParser,
    stringTypeLiteralParser,
]);

export type SmallTypeLiteral = z.infer<typeof smallTypeLiteralParser>;

export const largeTypeTypeLiteralParser = astNodeParser(
    "largeTypeTypeLiteral",
    z.undefined(),
);

export type LargeTypeTypeLiteral = z.infer<typeof largeTypeTypeLiteralParser>;

/**
 * Unsafe since the real type is a patterned subtype of `string`.
 */
export const unsafeTypeBindingParser = astNodeParser("typeBinding", z.string());

export type TypeBinding = z.infer<typeof unsafeTypeBindingParser>;

/**
 * Unsafe since the real type is a patterned subtype of `string`.
 */
export const unsafeTypeReferenceParser = astNodeParser(
    "typeReference",
    z.string(),
);

export type TypeReference = z.infer<typeof unsafeTypeReferenceParser>;

export type ProductType = AstNode<"productType", SmallType[]>;

export const productTypeParser: z.ZodType<ProductType> = z.lazy(() =>
    astNodeParser("productType", z.array(unsafeSmallTypeParser)),
);

export type SumType = AstNode<"sumType", SmallType[]>;

export const sumTypeParser: z.ZodType<SumType> = z.lazy(() =>
    astNodeParser("sumType", z.array(unsafeSmallTypeParser)),
);

export type FunctionType = AstNode<
    "functionType",
    {
        codomain: SmallType;
        domains: SmallType[];
    }
>;

export const functionTypeParser: z.ZodType<FunctionType> = z.lazy(() =>
    astNodeParser(
        "functionType",
        z.object({
            codomain: unsafeSmallTypeParser,
            domains: z.array(unsafeSmallTypeParser),
        }),
    ),
);

export type GenericTypeConstructor = AstNode<
    "genericTypeConstructor",
    {
        codomainType: SmallType;
        domainBindings: TypeBinding[];
    }
>;

export const genericTypeConstructorParser: z.ZodType<GenericTypeConstructor> =
    z.lazy(() =>
        astNodeParser(
            "genericTypeConstructor",
            z.object({
                codomainType: unsafeSmallTypeParser,
                domainBindings: z.array(unsafeTypeBindingParser),
            }),
        ),
    );

export type GenericTypeEliminator = AstNode<
    "genericTypeEliminator",
    {
        arguments: SmallType[];
        function: TypeReference | GenericTypeConstructor;
    }
>;

export const genericTypeEliminatorParser = z.lazy(() =>
    astNodeParser(
        "genericTypeEliminator",
        z.object({
            arguments: z.array(unsafeSmallTypeParser),
            function: unsafeTypeReferenceParser,
        }),
    ),
);

export type LargeType = SmallType | GenericTypeConstructor;

export const largeTypeParser: z.ZodType<LargeType> = z.lazy(() =>
    z.union([unsafeSmallTypeParser, genericTypeConstructorParser]),
);

// ## Terms

export const booleanTermLiteralParser = astNodeParser(
    "booleanTermLiteral",
    z.boolean(),
);

export type BooleanTermLiteral = z.infer<typeof booleanTermLiteralParser>;

export const floatTermLiteralParser = astNodeParser(
    "floatTermLiteral",
    z.number(),
);

export type FloatTermLiteral = z.infer<typeof floatTermLiteralParser>;

export const integerTermLiteralParser = astNodeParser(
    "integerTermLiteral",
    z.number().int(),
);

export type IntegerTermLiteral = z.infer<typeof integerTermLiteralParser>;

export const stringTermLiteralParser = astNodeParser(
    "stringTermLiteral",
    z.string(),
);

export type StringTermLiteral = z.infer<typeof stringTermLiteralParser>;

export const termLiteralParser = z.union([
    booleanTermLiteralParser,
    floatTermLiteralParser,
    integerTermLiteralParser,
    stringTermLiteralParser,
]);

export type TermLiteral = z.infer<typeof termLiteralParser>;

export const clientImplementationParser = astNodeParser(
    "clientImplementation",
    z.undefined(),
);

export type ClientImplementation = z.infer<typeof clientImplementationParser>;

/**
 * Unsafe since the real type is a patterned subtype of `string`.
 */
export const unsafeTermBindingParser = astNodeParser("termBinding", z.string());

export type TermBinding = z.infer<typeof unsafeTermBindingParser>;

/**
 * Unsafe since the real type is a patterned subtype of `string`.
 */
export const unsafeTermReferenceParser = astNodeParser(
    "termReference",
    z.string(),
);

export type TermReference = z.infer<typeof unsafeTermReferenceParser>;

export type ProductTermConstructor = AstNode<"productTermConstructor", Term[]>;

export const productTermConstructorParser: z.ZodType<ProductTermConstructor> =
    z.lazy(() =>
        astNodeParser("productTermConstructor", z.array(unsafeTermParser)),
    );

export type ProductTermEliminator = AstNode<"productTermEliminator", Number>;

export const productTermEliminatorParser: z.ZodType<ProductTermEliminator> =
    z.lazy(() => astNodeParser("productTermEliminator", z.number().int()));

export type SumTermConstructor = AstNode<"sumTermConstructor", Number>;

export const sumTermConstructorParser: z.ZodType<SumTermConstructor> = z.lazy(
    () => astNodeParser("sumTermConstructor", z.number().int()),
);

export type SumTermEliminator = AstNode<
    "sumTermEliminator",
    Array<TermReference | FunctionTermConstructor>
>;

export const sumTermEliminatorParser: z.ZodType<SumTermEliminator> = z.lazy(
    () =>
        astNodeParser(
            "sumTermEliminator",
            z.array(
                z.union([
                    unsafeTermReferenceParser,
                    functionTermConstructorParser,
                ]),
            ),
        ),
);

export type LambdaConstructor = AstNode<
    "lambdaConstructor",
    {
        codomainTerm: Term;
        domainBindings: TermBinding[];
    }
>;

export const lambdaConstructorParser: z.ZodType<LambdaConstructor> = z.lazy(
    () =>
        astNodeParser(
            "lambdaConstructor",
            z.object({
                codomainTerm: unsafeTermParser,
                domainBindings: z.array(unsafeTermBindingParser),
            }),
        ),
);

export const functionTermConstructorParser = z.union([
    lambdaConstructorParser,
    productTermEliminatorParser,
    sumTermConstructorParser,
    sumTermEliminatorParser,
]);

export type FunctionTermConstructor = z.infer<
    typeof functionTermConstructorParser
>;

export type FunctionTermEliminator = AstNode<
    "functionTermEliminator",
    {
        arguments: Term[];
        function: TermReference | FunctionTermConstructor;
    }
>;

export const functionTermEliminatorParser: z.ZodType<FunctionTermEliminator> =
    z.lazy(() =>
        astNodeParser(
            "functionTermEliminator",
            z.object({
                arguments: z.array(unsafeTermParser),
                function: z.union([
                    unsafeTermReferenceParser,
                    functionTermConstructorParser,
                ]),
            }),
        ),
    );

export type Term =
    | TermLiteral
    | TermReference
    | ProductTermConstructor
    | FunctionTermConstructor
    | FunctionTermEliminator;

/**
 * Unsafe since component type `unsafeTermReference` is unsafe.
 */
export const unsafeTermParser: z.ZodType<Term> = z.lazy(() =>
    z.union([
        termLiteralParser,
        unsafeTermReferenceParser,
        productTermConstructorParser,
        functionTermConstructorParser,
        functionTermEliminatorParser,
    ]),
);

// ## Definitions
export const termDefinitionParser = astNodeParser(
    "termDefinition",
    z.object({
        binding: unsafeTermBindingParser,
        term: z.union([unsafeTermParser, clientImplementationParser]),
        type: largeTypeParser,
    }),
);

export type TermDefinition = z.infer<typeof termDefinitionParser>;

export const typeDefinitionParser = astNodeParser(
    "typeDefinition",
    z.object({ binding: unsafeTypeBindingParser, type: largeTypeParser }),
);

export type TypeDefinition = z.infer<typeof typeDefinitionParser>;

// ## Library Node
export const libraryParser = astNodeParser(
    "library",
    z.object({
        termDefinitions: z.array(termDefinitionParser),
        typeDefinitions: z.array(typeDefinitionParser),
    }),
);

export type Library = z.infer<typeof libraryParser>;
