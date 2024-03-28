import { z } from "zod";

import { astNodeParser } from "../generics";

export const clientImplementationAstNodeParser = astNodeParser(
    z.undefined(),
    z.literal("clientImplementation"),
);

export type ClientImplementationAstNode = z.infer<
    typeof clientImplementationAstNodeParser
>;
