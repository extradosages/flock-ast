import { z } from "zod";

import { astNodeParser } from "../generics";

export const largeTypeTypeLiteralAstNodeParser = astNodeParser(
    z.undefined(),
    z.literal("largeTypeTypeLiteral"),
);

export type LargeTypeTypeLiteralAstNode = z.infer<
    typeof largeTypeTypeLiteralAstNodeParser
>;
