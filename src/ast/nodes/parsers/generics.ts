import { z } from "zod";

import { AstNodeTypeUnknown } from "./nodeTypes";

export type AstNode<AstNodeType extends AstNodeTypeUnknown, AstNodeData> = {
    data: AstNodeData;
    id: string;
    type: AstNodeType;
};

export const astNodeParser = <
    AstNodeType extends AstNodeTypeUnknown,
    AstNodeData,
>(
    dataParser: z.ZodType<AstNodeData>,
    typeParser: z.ZodType<AstNodeType>,
) =>
    z.object({
        data: dataParser,
        id: z.string(),
        type: typeParser,
    });
