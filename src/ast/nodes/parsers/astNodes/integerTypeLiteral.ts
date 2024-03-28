import { z } from "zod";

import { astNodeParser } from "../generics";

export const integerTypeLiteralAstNodeParser = astNodeParser(
    z.undefined(),
    z.literal("integerTypeLiteral"),
);

export type IntegerTypeLiteralAstNode = z.infer<
    typeof integerTypeLiteralAstNodeParser
>;
