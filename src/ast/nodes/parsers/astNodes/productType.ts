import { z } from "zod";

import { astNodeRefParser } from "../astNodeRefs";
import { astNodeParser } from "../generics";
import { smallTypeAstNodeTypeUnknownParser } from "../unions/smallType";

export const productTypeAstNodeParser = astNodeParser(
    z.array(astNodeRefParser(smallTypeAstNodeTypeUnknownParser)),
    z.literal("productType"),
);

export type ProductTypeAstNode = z.infer<typeof productTypeAstNodeParser>;
