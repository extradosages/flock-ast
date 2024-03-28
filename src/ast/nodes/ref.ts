import { AstNode, AstNodeRef, AstNodeTypeUnknown } from "./parsers";

export const ref = <AstNodeType extends AstNodeTypeUnknown>(
    astNode: AstNode<AstNodeType>,
): AstNodeRef<AstNodeType> => ({
    id: astNode.id,
    type: astNode.type,
});
