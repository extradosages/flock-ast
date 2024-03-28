import { z } from "zod";

import { astNodeParser } from "../generics";

export const sumTermConstructorAstNodeParser = astNodeParser(
    z.number().int(),
    z.literal("sumTermConstructor"),
);

export type SumTermConstructorAstNode = z.infer<
    typeof sumTermConstructorAstNodeParser
>;
