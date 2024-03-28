import { z } from "zod";

import { astNodeRefParser } from "../astNodeRefs";
import { astNodeParser } from "../generics";
import { smallTypeAstNodeTypeUnknownParser } from "../unions/smallType";

export const sumTypeAstNodeParser = astNodeParser(
    z.array(astNodeRefParser(smallTypeAstNodeTypeUnknownParser)),
    z.literal("sumType"),
);

export type SumTypeAstNode = z.infer<typeof sumTypeAstNodeParser>;
