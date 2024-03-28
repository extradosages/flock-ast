import { z } from "zod";

import { astNodeRefParser } from "../astNodeRefs";
import { astNodeParser } from "../generics";

export const libraryAstNodeParser = astNodeParser(
    z.object({
        termDefinitions: z.array(astNodeRefParser(z.literal("termDefinition"))),
        typeDefinitions: z.array(astNodeRefParser(z.literal("typeDefinition"))),
    }),
    z.literal("library"),
);

export type LibraryAstNode = z.infer<typeof libraryAstNodeParser>;
