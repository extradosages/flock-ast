import { z } from "zod";

import { astNodeParser } from "../generics";
import { astNodeRefParser } from "../astNodeRefs";
import { termAstNodeTypeUnknownParser } from "../unions/term";

export const lambdaConstructorAstNodeParser = astNodeParser(
    z.object({
        codomainTerm: astNodeRefParser(termAstNodeTypeUnknownParser),
        domainBindings: z.array(astNodeRefParser(z.literal("termBinding"))),
    }),
    z.literal("lambdaConstructor"),
);

export type LambdaConstructorAstNode = z.infer<
    typeof lambdaConstructorAstNodeParser
>;
