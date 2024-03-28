import { id } from "./id";
import {
    AstNodeRef,
    AstNodeTypeUnknown,
    AstNodeUnknown,
    BooleanTermLiteralAstNode,
    BooleanTypeLiteralAstNode,
    ClientImplementationAstNode,
    FloatTermLiteralAstNode,
    FloatTypeLiteralAstNode,
    FunctionTermEliminatorAstNode,
    FunctionTypeAstNode,
    GenericTypeConstructorAstNode,
    GenericTypeEliminatorAstNode,
    IntegerTermLiteralAstNode,
    IntegerTypeLiteralAstNode,
    LambdaConstructorAstNode,
    LargeTypeTypeLiteralAstNode,
    LibraryAstNode,
    ProductTermConstructorAstNode,
    ProductTermEliminatorAstNode,
    ProductTypeAstNode,
    StringTermLiteralAstNode,
    StringTypeLiteralAstNode,
    SumTermConstructorAstNode,
    SumTermEliminatorAstNode,
    SumTypeAstNode,
    TermBindingAstNode,
    TermDefinitionAstNode,
    TermReferenceAstNode,
    TypeBindingAstNode,
    NormalizedTypeDefinitionAstNode,
    TypeReferenceAstNode,
} from "./parsers";

const astNodeConstructor =
    <AstNode extends AstNodeUnknown>(nodeType: AstNode["type"]) =>
    (data: AstNode["data"]): AstNode =>
        ({
            data,
            id: id(),
            type: nodeType,
        }) as AstNode;

export const astNodeRef = <AstNodeType extends AstNodeTypeUnknown>(
    nodeType: AstNodeType,
    id: string,
): AstNodeRef<AstNodeType> => ({ id, type: nodeType });

export const booleanTypeLiteral =
    astNodeConstructor<BooleanTypeLiteralAstNode>("booleanTypeLiteral");

export const floatTypeLiteral =
    astNodeConstructor<FloatTypeLiteralAstNode>("floatTypeLiteral");

export const integerTypeLiteral =
    astNodeConstructor<IntegerTypeLiteralAstNode>("integerTypeLiteral");

export const stringTypeLiteral =
    astNodeConstructor<StringTypeLiteralAstNode>("stringTypeLiteral");

export const largeTypeTypeLiteral =
    astNodeConstructor<LargeTypeTypeLiteralAstNode>("largeTypeTypeLiteral");

export const unsafeTypeBinding =
    astNodeConstructor<TypeBindingAstNode>("typeBinding");

export const unsafeTypeReference =
    astNodeConstructor<TypeReferenceAstNode>("typeReference");

export const productType =
    astNodeConstructor<ProductTypeAstNode>("productType");

export const sumType = astNodeConstructor<SumTypeAstNode>("sumType");

export const functionType =
    astNodeConstructor<FunctionTypeAstNode>("functionType");

export const genericTypeConstructor =
    astNodeConstructor<GenericTypeConstructorAstNode>("genericTypeConstructor");

export const genericTypeEliminator =
    astNodeConstructor<GenericTypeEliminatorAstNode>("genericTypeEliminator");

export const booleanTermLiteral =
    astNodeConstructor<BooleanTermLiteralAstNode>("booleanTermLiteral");

export const floatTermLiteral =
    astNodeConstructor<FloatTermLiteralAstNode>("floatTermLiteral");

export const unsafeIntegerTermLiteral =
    astNodeConstructor<IntegerTermLiteralAstNode>("integerTermLiteral");

export const stringTermLiteral =
    astNodeConstructor<StringTermLiteralAstNode>("stringTermLiteral");

export const clientImplementation =
    astNodeConstructor<ClientImplementationAstNode>("clientImplementation");

export const unsafeTermBinding =
    astNodeConstructor<TermBindingAstNode>("termBinding");

export const unsafeTermReference =
    astNodeConstructor<TermReferenceAstNode>("termReference");

export const productTermConstructor =
    astNodeConstructor<ProductTermConstructorAstNode>("productTermConstructor");

export const unsafeProductTermEliminator =
    astNodeConstructor<ProductTermEliminatorAstNode>("productTermEliminator");

export const unsafeSumTermConstructor =
    astNodeConstructor<SumTermConstructorAstNode>("sumTermConstructor");

export const sumTermEliminator =
    astNodeConstructor<SumTermEliminatorAstNode>("sumTermEliminator");

export const lambdaConstructor =
    astNodeConstructor<LambdaConstructorAstNode>("lambdaConstructor");

export const functionTermEliminator =
    astNodeConstructor<FunctionTermEliminatorAstNode>("functionTermEliminator");

export const termDefinition =
    astNodeConstructor<TermDefinitionAstNode>("termDefinition");

export const typeDefinition =
    astNodeConstructor<NormalizedTypeDefinitionAstNode>("typeDefinition");

export const library = astNodeConstructor<LibraryAstNode>("library");
