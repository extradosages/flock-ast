import { anonymize } from "./anonymize";
import { denormalize } from "./denormalize";
import {
    AstNodeUnknown,
    AstNodeTypeUnknown,
    AstNodeRef,
    AstNode,
} from "./nodes";

/**
 * A small wrapper class around an AST node that provides a chainable API for
 * denormalization.
 *
 * Contains a pointer to the AST and the node itself.
 */
export class NormalizedAstNode<
    RootNodeType extends AstNodeTypeUnknown,
    AstNodeType extends AstNodeTypeUnknown,
> {
    ast: NormalizedAst<RootNodeType>;
    node: AstNode<AstNodeType>;

    constructor(ast: NormalizedAst<RootNodeType>, node: AstNode<AstNodeType>) {
        this.ast = ast;
        this.node = node;
    }

    denormalize = (): DenormalizedAst =>
        new DenormalizedAst(denormalize(this.ast.deref, this.node));
}

/**
 * A class which provides "context" for a collection of AST nodes.
 *
 * This context can be used to dereference AST node references, and consequently to denormalize
 * nodes (sub-trees).
 */
export class NormalizedAst<RootNodeType extends AstNodeTypeUnknown> {
    rootNodeType: RootNodeType;
    nodes: AstNodeUnknown[];

    constructor(rootNodeType: RootNodeType) {
        this.rootNodeType = rootNodeType;
        this.nodes = [];
    }

    /**
     * Add a node to the AST.
     *
     * Returns `this` for chain-ability.
     */
    addNode = (node: AstNodeUnknown) => {
        this.nodes.push(node);
        return this;
    };

    /**
     * Dereferences a reference to a node.
     */
    deref = <AstNodeType extends AstNodeTypeUnknown>(
        ref: AstNodeRef<AstNodeType>,
    ): AstNode<AstNodeType> => {
        const node = this.nodes.find(({ id }) => id === ref.id);

        if (node === undefined) {
            throw new Error(`Dangling ref ${JSON.stringify(ref)}`);
        }

        return node as AstNode<AstNodeType>;
    };

    node = (
        index: number,
    ): NormalizedAstNode<RootNodeType, AstNodeTypeUnknown> =>
        new NormalizedAstNode(this, this.nodes[index]);

    /**
     * Returns the root node of the AST.
     *
     * TODO: This could be better typed, or use a zod parser or something.
     */
    root = (): NormalizedAstNode<RootNodeType, RootNodeType> => {
        if (this.nodes.length === 0) {
            throw new Error("No nodes");
        }

        const lastIndex = this.nodes.length - 1;
        return this.node(lastIndex) as NormalizedAstNode<
            RootNodeType,
            RootNodeType
        >;
    };
}

/**
 * A small wrapper class around an AST node (/root /sub-tree) that provides a chainable API for
 * anonymization.
 *
 * Presently not strongly typed.
 *
 * TODO: Add an API for normalization.
 */
export class DenormalizedAst {
    root: unknown;

    constructor(root: unknown) {
        this.root = root;
    }

    anonymize = () => anonymize(this.root);
}
