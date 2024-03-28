import { z } from "zod";

import { astNodeParser } from "../generics";

export const booleanTermLiteralAstNodeParser = astNodeParser(
    z.boolean(),
    z.literal("booleanTermLiteral"),
);

export type BooleanTermLiteralAstNode = z.infer<
    typeof booleanTermLiteralAstNodeParser
>;
