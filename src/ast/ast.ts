import { denormalize } from "./denormalize";
import {
    AstNodeUnknown,
    AstNodeTypeUnknown,
    AstNodeRef,
    AstNode,
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

    denormalize = (value: unknown): unknown => {
        return denormalize(this.deref, value);
    };

    denormalizeAll = () => {
        return this.nodes.map(this.denormalize);
    };

    root = (): AstNodeUnknown => {
        if (this.nodes.length === 0) {
            throw new Error("No nodes");
        }
        return this.nodes.slice(-1)[0];
    };

    denormalizedRoot = (): unknown => {
        return this.denormalize(this.root());
    };
}
