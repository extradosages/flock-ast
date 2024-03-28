import { z } from "zod";

import { astNodeParser } from "../generics";

export const termReferenceAstNodeParser = astNodeParser(
    // TODO: Maybe tighten this
    z.string(),
    z.literal("termReference"),
);

export type TermReferenceAstNode = z.infer<typeof termReferenceAstNodeParser>;
