import { z } from "zod";

import { astNodeParser } from "../generics";

export const functionTypeAstNodeParser = astNodeParser(
    z.undefined(),
    z.literal("functionType"),
);

export type FunctionTypeAstNode = z.infer<typeof functionTypeAstNodeParser>;
