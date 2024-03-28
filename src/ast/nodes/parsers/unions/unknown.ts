import { z } from "zod";

import { astNodeParser } from "../generics";
import { astNodeTypeUnknownParser } from "../nodeTypes";

// TODO: Make this an actual discriminated union
export const astNodeUnknownParser = astNodeParser(
    z.unknown(),
    astNodeTypeUnknownParser,
);

export type AstNodeUnknown = z.infer<typeof astNodeUnknownParser>;
