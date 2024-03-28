import { z } from "zod";

import { astNodeParser } from "../generics";

export const integerTermLiteralAstNodeParser = astNodeParser(
    z.number().int(),
    z.literal("integerTermLiteral"),
);

export type IntegerTermLiteralAstNode = z.infer<
    typeof integerTermLiteralAstNodeParser
>;
