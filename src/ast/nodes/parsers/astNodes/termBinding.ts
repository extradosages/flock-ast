import { z } from "zod";

import { astNodeParser } from "../generics";

export const termBindingAstNodeParser = astNodeParser(
    // TODO: Maybe tighten this
    z.string(),
    z.literal("termBinding"),
);

export type TermBindingAstNode = z.infer<typeof termBindingAstNodeParser>;
