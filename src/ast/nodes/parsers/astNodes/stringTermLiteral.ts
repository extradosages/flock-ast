import { z } from "zod";

import { astNodeParser } from "../generics";

export const stringTermLiteralAstNodeParser = astNodeParser(
    z.string(),
    z.literal("stringTermLiteral"),
);

export type StringTermLiteralAstNode = z.infer<
    typeof stringTermLiteralAstNodeParser
>;
