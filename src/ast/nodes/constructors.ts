import { id } from "./id";
import {
    AstNode,
    AstNodeData,
    AstNodeRef,
    AstNodeTypeUnknown,
} from "./parsers";

const astNodeConstructor =
    <AstNodeType extends AstNodeTypeUnknown>(nodeType: AstNodeType) =>
    (data: AstNodeData<AstNodeType>): AstNode<AstNodeType> => ({
        data,
        id: id(),
        type: nodeType,
    });

export const astNodeRef = <AstNodeType extends AstNodeTypeUnknown>(
    nodeType: AstNodeType,
    id: string,
): AstNodeRef<AstNodeType> => ({ id, type: nodeType });

export const booleanTypeLiteral = astNodeConstructor("booleanTypeLiteral");

export const floatTypeLiteral = astNodeConstructor("floatTypeLiteral");

export const integerTypeLiteral = astNodeConstructor("integerTypeLiteral");

export const stringTypeLiteral = astNodeConstructor("stringTypeLiteral");

export const largeTypeTypeLiteral = astNodeConstructor("largeTypeTypeLiteral");

export const unsafeTypeBinding = astNodeConstructor("typeBinding");

export const unsafeTypeReference = astNodeConstructor("typeReference");

export const productType = astNodeConstructor("productType");

export const sumType = astNodeConstructor("sumType");

export const functionType = astNodeConstructor("functionType");

export const genericTypeConstructor = astNodeConstructor(
    "genericTypeConstructor",
);

export const genericTypeEliminator = astNodeConstructor(
    "genericTypeEliminator",
);

export const booleanTermLiteral = astNodeConstructor("booleanTermLiteral");

export const floatTermLiteral = astNodeConstructor("floatTermLiteral");

export const unsafeIntegerTermLiteral =
    astNodeConstructor("integerTermLiteral");

export const stringTermLiteral = astNodeConstructor("stringTermLiteral");

export const clientImplementation = astNodeConstructor("clientImplementation");

export const unsafeTermBinding = astNodeConstructor("termBinding");

export const unsafeTermReference = astNodeConstructor("termReference");

export const productTermConstructor = astNodeConstructor(
    "productTermConstructor",
);

export const unsafeProductTermEliminator = astNodeConstructor(
    "productTermEliminator",
);

export const unsafeSumTermConstructor =
    astNodeConstructor("sumTermConstructor");

export const sumTermEliminator = astNodeConstructor("sumTermEliminator");

export const lambdaConstructor = astNodeConstructor("lambdaConstructor");

export const functionTermEliminator = astNodeConstructor(
    "functionTermEliminator",
);

export const termDefinition = astNodeConstructor("termDefinition");

export const typeDefinition = astNodeConstructor("typeDefinition");

export const library = astNodeConstructor("library");
