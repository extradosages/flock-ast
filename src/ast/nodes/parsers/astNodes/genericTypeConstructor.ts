import { z } from "zod";

import { astNodeParser } from "../generics";
import { astNodeRefParser } from "../astNodeRefs";
import { smallTypeLiteralAstNodeTypeUnknownParser } from "../unions/smallTypeLiteral";

export const genericTypeConstructorAstNodeParser = astNodeParser(
    z.object({
        codomainType: astNodeRefParser(
            smallTypeLiteralAstNodeTypeUnknownParser,
        ),
        domainBindings: z.array(astNodeRefParser(z.literal("typeBinding"))),
    }),
    z.literal("genericTypeConstructor"),
);

export type GenericTypeConstructorAstNode = z.infer<
    typeof genericTypeConstructorAstNodeParser
>;
