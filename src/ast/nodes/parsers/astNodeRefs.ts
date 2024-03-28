import { z } from "zod";

import { AstNodeTypeUnknown, astNodeTypeUnknownParser } from "./nodeTypes";

export const astNodeRefParser = <AstNodeType extends AstNodeTypeUnknown>(
    astNodeType: z.ZodType<AstNodeType>,
) =>
    z
        .object({
            id: z.string(),
            type: astNodeType,
        })
        .strict();

export type AstNodeRef<AstNodeType extends AstNodeTypeUnknown> = {
    id: string;
    type: AstNodeType;
};

export const astNodeRefUnknownParser = astNodeRefParser(
    astNodeTypeUnknownParser,
);

export type AstNodeRefUnknown = z.infer<typeof astNodeRefUnknownParser>;
