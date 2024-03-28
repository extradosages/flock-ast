import {
    AstNodeUnknown,
    AstNodeTypeUnknown,
    AstNodeRef,
    AstNode,
    InlineResult,
    inline,
} from "./nodes";

export class Ast {
    nodes: AstNodeUnknown[];

    constructor() {
        this.nodes = [];
    }

    addNode = (node: AstNodeUnknown) => {
        this.nodes.push(node);
    };

    deref = <AstNodeType extends AstNodeTypeUnknown>(
        ref: AstNodeRef<AstNodeType>,
    ): AstNode<AstNodeType> => {
        const node = this.nodes.find(({ id }) => id === ref.id);

        if (node === undefined) {
            throw new Error(`Dangling ref ${JSON.stringify(ref)}`);
        }

        return node as AstNode<AstNodeType>;
    };

    inline = (value: unknown): InlineResult => {
        return inline(this.deref, value);
    };

    inlineAll = () => {
        return this.nodes.map(this.inline);
    };
}
