import { z } from "zod";

import { astNodeParser } from "../generics";

export const stringTypeLiteralAstNodeParser = astNodeParser(
    z.undefined(),
    z.literal("stringTypeLiteral"),
);

export type StringTypeLiteralAstNode = z.infer<
    typeof stringTypeLiteralAstNodeParser
>;
