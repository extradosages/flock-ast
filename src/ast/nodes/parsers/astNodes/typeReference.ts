import { z } from "zod";

import { astNodeParser } from "../generics";

export const typeReferenceAstNodeParser = astNodeParser(
    // TODO: Maybe tighten this
    z.string(),
    z.literal("typeReference"),
);

export type TypeReferenceAstNode = z.infer<typeof typeReferenceAstNodeParser>;
