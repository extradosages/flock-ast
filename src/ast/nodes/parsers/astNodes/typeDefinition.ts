import { z } from "zod";

import { astNodeParser } from "../generics";
import { astNodeRefParser } from "../astNodeRefs";
import { smallTypeAstNodeTypeUnknownParser } from "../unions/smallType";

export const normalizedTypeDefinitionAstNodeParser = astNodeParser(
    z.object({
        binding: astNodeRefParser(z.literal("typeBinding")),
        term: astNodeRefParser(smallTypeAstNodeTypeUnknownParser),
    }),
    z.literal("typeDefinition"),
);

export const denormalizedTypeDefinitionAstNodeParser = astNodeParser(
    z.object({
        binding: denormalizedTypeBindingAstNodeParser,
        term: denormalizedSmallTypeAstNodeParser,
    }),
    z.literal("typeDefinition"),
);

export type NormalizedTypeDefinitionAstNode = z.infer<
    typeof normalizedTypeDefinitionAstNodeParser
>;
