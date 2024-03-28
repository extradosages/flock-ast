import { z } from "zod";

import {
    smallTypeAstNodeTypeUnknownParser,
    smallTypeAstNodeUnknownParser,
} from "./smallType";
import { genericTypeConstructorAstNodeParser } from "../astNodes/genericTypeConstructor";
import { AstNode } from "../generics";
import { AstNodeTypeUnknown } from "../nodeTypes";

export const largeTypeAstNodeTypeUnknownParser = z.enum([
    ...smallTypeAstNodeTypeUnknownParser.options,
    "genericTypeConstructor",
] as const satisfies AstNodeTypeUnknown[]);

export type LargeTypeAstNodeTypeUnknown = z.infer<
    typeof largeTypeAstNodeTypeUnknownParser
>;

export const largeTypeAstNodeUnknownParser = z.discriminatedUnion("type", [
    ...smallTypeAstNodeUnknownParser.options,
    genericTypeConstructorAstNodeParser,
] as const satisfies Array<
    // Had to add `Partial` here because typescript was freaking out
    z.ZodType<Partial<AstNode<LargeTypeAstNodeTypeUnknown, unknown>>>
>);

export type LargeTypeAstNodeUnknown = z.infer<
    typeof largeTypeAstNodeUnknownParser
>;
