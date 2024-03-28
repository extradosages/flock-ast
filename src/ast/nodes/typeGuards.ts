import {
    BooleanTypeLiteralAstNode,
    booleanTypeLiteralAstNodeParser,
    FloatTypeLiteralAstNode,
    floatTypeLiteralAstNodeParser,
    IntegerTypeLiteralAstNode,
    integerTypeLiteralAstNodeParser,
    StringTypeLiteralAstNode,
    stringTypeLiteralAstNodeParser,
    SumTypeAstNode,
    sumTypeAstNodeParser,
    BooleanTermLiteralAstNode,
    booleanTermLiteralAstNodeParser,
    FloatTermLiteralAstNode,
    floatTermLiteralAstNodeParser,
    IntegerTermLiteralAstNode,
    integerTermLiteralAstNodeParser,
    StringTermLiteralAstNode,
    stringTermLiteralAstNodeParser,
    ClientImplementationAstNode,
    clientImplementationAstNodeParser,
    ProductTermConstructorAstNode,
    productTermConstructorAstNodeParser,
    SumTermConstructorAstNode,
    sumTermConstructorAstNodeParser,
    LambdaConstructorAstNode,
    lambdaConstructorAstNodeParser,
    TermDefinitionAstNode,
    termDefinitionAstNodeParser,
    NormalizedTypeDefinitionAstNode,
    normalizedTypeDefinitionAstNodeParser,
    LibraryAstNode,
    libraryAstNodeParser,
    GenericTypeConstructorAstNode,
    GenericTypeEliminatorAstNode,
    ProductTermEliminatorAstNode,
    SumTermEliminatorAstNode,
    TermBindingAstNode,
    TermReferenceAstNode,
    TypeBindingAstNode,
    TypeReferenceAstNode,
    genericTypeConstructorAstNodeParser,
    genericTypeEliminatorAstNodeParser,
    ProductTypeAstNode,
    productTypeAstNodeParser,
    FunctionTypeAstNode,
    functionTypeAstNodeParser,
    typeBindingAstNodeParser,
    typeReferenceAstNodeParser,
    LargeTypeTypeLiteralAstNode,
    largeTypeTypeLiteralAstNodeParser,
    termBindingAstNodeParser,
    termReferenceAstNodeParser,
    productTermEliminatorAstNodeParser,
    sumTermEliminatorAstNodeParser,
} from "./parsers";

export const isBooleanTypeLiteral = (
    val: unknown,
): val is BooleanTypeLiteralAstNode =>
    booleanTypeLiteralAstNodeParser.safeParse(val).success;

export const isFloatTypeLiteral = (
    val: unknown,
): val is FloatTypeLiteralAstNode =>
    floatTypeLiteralAstNodeParser.safeParse(val).success;

export const isIntegerTypeLiteral = (
    val: unknown,
): val is IntegerTypeLiteralAstNode =>
    integerTypeLiteralAstNodeParser.safeParse(val).success;

export const isStringTypeLiteral = (
    val: unknown,
): val is StringTypeLiteralAstNode =>
    stringTypeLiteralAstNodeParser.safeParse(val).success;

export const isLargeTypeTypeLiteral = (
    val: unknown,
): val is LargeTypeTypeLiteralAstNode =>
    largeTypeTypeLiteralAstNodeParser.safeParse(val).success;

export const isTypeBinding = (val: unknown): val is TypeBindingAstNode =>
    typeBindingAstNodeParser.safeParse(val).success;

export const isTypeReference = (val: unknown): val is TypeReferenceAstNode =>
    typeReferenceAstNodeParser.safeParse(val).success;

export const isProductType = (val: unknown): val is ProductTypeAstNode =>
    productTypeAstNodeParser.safeParse(val).success;

export const isSumType = (val: unknown): val is SumTypeAstNode =>
    sumTypeAstNodeParser.safeParse(val).success;

export const isFunctionType = (val: unknown): val is FunctionTypeAstNode =>
    functionTypeAstNodeParser.safeParse(val).success;

export const isGenericTypeConstructor = (
    val: unknown,
): val is GenericTypeConstructorAstNode =>
    genericTypeConstructorAstNodeParser.safeParse(val).success;

export const isGenericTypeEliminator = (
    val: unknown,
): val is GenericTypeEliminatorAstNode =>
    genericTypeEliminatorAstNodeParser.safeParse(val).success;

export const isBooleanTermLiteral = (
    val: unknown,
): val is BooleanTermLiteralAstNode =>
    booleanTermLiteralAstNodeParser.safeParse(val).success;

export const isFloatTermLiteral = (
    val: unknown,
): val is FloatTermLiteralAstNode =>
    floatTermLiteralAstNodeParser.safeParse(val).success;

export const isIntegerTermLiteral = (
    val: unknown,
): val is IntegerTermLiteralAstNode =>
    integerTermLiteralAstNodeParser.safeParse(val).success;

export const isStringTermLiteral = (
    val: unknown,
): val is StringTermLiteralAstNode =>
    stringTermLiteralAstNodeParser.safeParse(val).success;

export const isClientImplementation = (
    val: unknown,
): val is ClientImplementationAstNode =>
    clientImplementationAstNodeParser.safeParse(val).success;

export const isTermBinding = (val: unknown): val is TermBindingAstNode =>
    termBindingAstNodeParser.safeParse(val).success;

export const isTermReference = (val: unknown): val is TermReferenceAstNode =>
    termReferenceAstNodeParser.safeParse(val).success;

export const isProductTermConstructor = (
    val: unknown,
): val is ProductTermConstructorAstNode =>
    productTermConstructorAstNodeParser.safeParse(val).success;

export const isProductTermEliminator = (
    val: unknown,
): val is ProductTermEliminatorAstNode =>
    productTermEliminatorAstNodeParser.safeParse(val).success;

export const isSumTermConstructor = (
    val: unknown,
): val is SumTermConstructorAstNode =>
    sumTermConstructorAstNodeParser.safeParse(val).success;

export const isSumTermEliminator = (
    val: unknown,
): val is SumTermEliminatorAstNode =>
    sumTermEliminatorAstNodeParser.safeParse(val).success;

export const isLambdaConstructor = (
    val: unknown,
): val is LambdaConstructorAstNode =>
    lambdaConstructorAstNodeParser.safeParse(val).success;

export const isTermDefinition = (val: unknown): val is TermDefinitionAstNode =>
    termDefinitionAstNodeParser.safeParse(val).success;

export const isTypeDefinition = (
    val: unknown,
): val is NormalizedTypeDefinitionAstNode =>
    normalizedTypeDefinitionAstNodeParser.safeParse(val).success;

export const isLibrary = (val: unknown): val is LibraryAstNode =>
    libraryAstNodeParser.safeParse(val).success;
