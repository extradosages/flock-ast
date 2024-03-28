import { AstNode, AstNodeRef, AstNodeTypeUnknown } from "./parsers";

export type Deref = <AstNodeType extends AstNodeTypeUnknown>(
    ref: AstNodeRef<AstNodeType>,
) => AstNode<AstNodeType>;
