import { z } from "zod";

import { astNodeRefParser } from "../astNodeRefs";
import { astNodeParser } from "../generics";
import { termAstNodeTypeUnknownParser } from "../unions/term";

export const productTermConstructorAstNodeParser = astNodeParser(
    z.array(astNodeRefParser(termAstNodeTypeUnknownParser)),
    z.literal("productTermConstructor"),
);

export type ProductTermConstructorAstNode = z.infer<
    typeof productTermConstructorAstNodeParser
>;
