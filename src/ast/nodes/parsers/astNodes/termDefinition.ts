import { z } from "zod";
import { astNodeRefParser } from "../astNodeRefs";
import { astNodeParser } from "../generics";
import { smallTypeAstNodeTypeUnknownParser } from "../unions/smallType";
import { termAstNodeTypeUnknownParser } from "../unions/term";

export const termDefinitionAstNodeParser = astNodeParser(
    z.object({
        binding: astNodeRefParser(z.literal("termBinding")),
        term: z.union([
            astNodeRefParser(termAstNodeTypeUnknownParser),
            astNodeRefParser(z.literal("clientImplementation")),
        ]),
        type: astNodeRefParser(smallTypeAstNodeTypeUnknownParser),
    }),
    z.literal("termDefinition"),
);

export type TermDefinitionAstNode = z.infer<typeof termDefinitionAstNodeParser>;
