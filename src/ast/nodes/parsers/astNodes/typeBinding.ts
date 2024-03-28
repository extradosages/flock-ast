import { z } from "zod";

import { astNodeParser } from "../generics";

export const typeBindingAstNodeParser = astNodeParser(
    // TODO: Maybe tighten this
    z.string(),
    z.literal("typeBinding"),
);

export type TypeBindingAstNode = z.infer<typeof typeBindingAstNodeParser>;
