import { z } from "zod";

import { astNodeParser } from "../generics";

export const productTermEliminatorAstNodeParser = astNodeParser(
    z.number().int(),
    z.literal("productTermEliminator"),
);

export type ProductTermEliminatorAstNode = z.infer<
    typeof productTermEliminatorAstNodeParser
>;
