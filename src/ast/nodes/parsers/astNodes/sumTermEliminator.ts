import { z } from "zod";

import { astNodeRefParser } from "../astNodeRefs";
import { astNodeParser } from "../generics";
import { termAstNodeTypeUnknownParser } from "../unions/term";

export const sumTermEliminatorAstNodeParser = astNodeParser(
    z.array(astNodeRefParser(termAstNodeTypeUnknownParser)),
    z.literal("sumTermEliminator"),
);

export type SumTermEliminatorAstNode = z.infer<
    typeof sumTermEliminatorAstNodeParser
>;
