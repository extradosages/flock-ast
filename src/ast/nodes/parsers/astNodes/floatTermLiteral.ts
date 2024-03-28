import { z } from "zod";

import { astNodeParser } from "../generics";

export const floatTermLiteralAstNodeParser = astNodeParser(
    z.number(),
    z.literal("floatTermLiteral"),
);

export type FloatTermLiteralAstNode = z.infer<
    typeof floatTermLiteralAstNodeParser
>;
