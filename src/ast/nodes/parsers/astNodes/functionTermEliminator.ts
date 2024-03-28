import { z } from "zod";

import { astNodeParser } from "../generics";
import { astNodeRefParser } from "../astNodeRefs";
import { termAstNodeTypeUnknownParser } from "../unions/term";
import { functionTermConstructorAstNodeTypeUnknownParser } from "../unions/functionTermConstructor";

export const functionTermEliminatorAstNodeParser = astNodeParser(
    z.object({
        arguments: astNodeRefParser(termAstNodeTypeUnknownParser),
        function: astNodeRefParser(
            functionTermConstructorAstNodeTypeUnknownParser,
        ),
    }),
    z.literal("functionTermEliminator"),
);

export type FunctionTermEliminatorAstNode = z.infer<
    typeof functionTermEliminatorAstNodeParser
>;
