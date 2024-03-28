import { z } from "zod";

import { astNodeParser } from "../generics";

export const floatTypeLiteralAstNodeParser = astNodeParser(
    z.undefined(),
    z.literal("floatTypeLiteral"),
);

export type FloatTypeLiteralAstNode = z.infer<
    typeof floatTypeLiteralAstNodeParser
>;
