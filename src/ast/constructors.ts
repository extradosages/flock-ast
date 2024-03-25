import {
    BooleanTermLiteral,
    BooleanTypeLiteral,
    ClientImplementation,
    FloatTermLiteral,
    FloatTypeLiteral,
    FunctionTermConstructor,
    FunctionTermEliminator,
    FunctionType,
    GenericTypeConstructor,
    GenericTypeEliminator,
    IntegerTermLiteral,
    IntegerTypeLiteral,
    LargeType,
    LargeTypeTypeLiteral,
    Library,
    ProductTermConstructor,
    ProductTermEliminator,
    ProductType,
    SmallType,
    StringTermLiteral,
    StringTypeLiteral,
    SumTermConstructor,
    SumTermEliminator,
    SumType,
    Term,
    TermBinding,
    TermDefinition,
    TermReference,
    TypeBinding,
    TypeDefinition,
    TypeReference,
} from "./types";

export const booleanTypeLiteral = (): BooleanTypeLiteral => ({
    node: "booleanTypeLiteral",
});

export const floatTypeLiteral = (): FloatTypeLiteral => ({
    node: "floatTypeLiteral",
});

export const integerTypeLiteral = (): IntegerTypeLiteral => ({
    node: "integerTypeLiteral",
});

export const stringTypeLiteral = (): StringTypeLiteral => ({
    node: "stringTypeLiteral",
});

export const largeTypeTypeLiteral = (): LargeTypeTypeLiteral => ({
    node: "largeTypeTypeLiteral",
});

export const unsafeTypeBinding = (data: string): TypeBinding => ({
    node: "typeBinding",
    data,
});

export const unsafeTypeReference = (data: string): TypeReference => ({
    node: "typeReference",
    data,
});

export const productType = (data: SmallType[]): ProductType => ({
    node: "productType",
    data,
});

export const sumType = (data: SmallType[]): SumType => ({
    node: "sumType",
    data,
});

export const functionType = (data: {
    codomain: SmallType;
    domains: SmallType[];
}): FunctionType => ({
    node: "functionType",
    data,
});

export const genericTypeConstructor = (data: {
    codomainType: SmallType;
    domainBindings: TypeBinding[];
}): GenericTypeConstructor => ({
    node: "genericTypeConstructor",
    data,
});

export const genericTypeEliminator = (data: {
    arguments: SmallType[];
    function: TypeReference | GenericTypeConstructor;
}): GenericTypeEliminator => ({
    node: "genericTypeEliminator",
    data,
});

export const booleanTermLiteral = (data: boolean): BooleanTermLiteral => ({
    node: "booleanTermLiteral",
    data,
});

export const floatTermLiteral = (data: number): FloatTermLiteral => ({
    node: "floatTermLiteral",
    data,
});

export const unsafeIntegerTermLiteral = (data: number): IntegerTermLiteral => ({
    node: "integerTermLiteral",
    data,
});

export const stringTermLiteral = (data: string): StringTermLiteral => ({
    node: "stringTermLiteral",
    data,
});

export const clientImplementation = (): ClientImplementation => ({
    node: "clientImplementation",
});

export const unsafeTermBinding = (data: string): TermBinding => ({
    node: "termBinding",
    data,
});

export const unsafeTermReference = (data: string): TermReference => ({
    node: "termReference",
    data,
});

export const productTermConstructor = (
    data: Term[],
): ProductTermConstructor => ({
    node: "productTermConstructor",
    data,
});

export const unsafeProductTermEliminator = (
    data: number,
): ProductTermEliminator => ({
    node: "productTermEliminator",
    data,
});

export const unsafeSumTermConstructor = (data: number): SumTermConstructor => ({
    node: "sumTermConstructor",
    data,
});

export const sumTermEliminator = (
    data: Array<TermReference | FunctionTermConstructor>,
): SumTermEliminator => ({
    node: "sumTermEliminator",
    data,
});

export const lambdaConstructor = (data: {
    codomainTerm: Term;
    domainBindings: TermBinding[];
}): FunctionTermConstructor => ({
    node: "lambdaConstructor",
    data,
});

export const functionTermEliminator = (data: {
    arguments: Term[];
    function: TermReference | FunctionTermConstructor;
}): FunctionTermEliminator => ({
    node: "functionTermEliminator",
    data,
});

export const termDefinition = (data: {
    binding: TermBinding;
    term: Term | ClientImplementation;
    type: LargeType;
}): TermDefinition => ({
    node: "termDefinition",
    data,
});

export const typeDefinition = (data: {
    binding: TypeBinding;
    type: LargeType;
}): TypeDefinition => ({
    node: "typeDefinition",
    data,
});

export const library = (data: {
    termDefinitions: TermDefinition[];
    typeDefinitions: TypeDefinition[];
}): Library => ({
    node: "library",
    data,
});
