import { z } from "zod";

import { astNodeRefParser } from "../astNodeRefs";
import { astNodeParser } from "../generics";
import { smallTypeAstNodeTypeUnknownParser } from "../unions/smallType";

export const genericTypeEliminatorAstNodeParser = astNodeParser(
    z.object({
        arguments: z.array(astNodeRefParser(smallTypeAstNodeTypeUnknownParser)),
        function: z.union([
            astNodeRefParser(z.literal("typeReference")),
            astNodeRefParser(z.literal("genericTypeConstructor")),
        ]),
    }),
    z.literal("genericTypeEliminator"),
);

export type GenericTypeEliminatorAstNode = z.infer<
    typeof genericTypeEliminatorAstNodeParser
>;
