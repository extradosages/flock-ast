import { z } from "zod";

import { astNodeParser } from "../generics";

export const booleanTypeLiteralAstNodeParser = astNodeParser(
    z.undefined(),
    z.literal("booleanTypeLiteral"),
);

export type BooleanTypeLiteralAstNode = z.infer<
    typeof booleanTypeLiteralAstNodeParser
>;
