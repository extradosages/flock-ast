import { z } from "zod";

export const anonymize = (denormalized: unknown): unknown => {
    debugger;
    const anonymizableResult = z
        .object({ id: z.string() })
        .passthrough()
        .safeParse(denormalized);

    if (anonymizableResult.success) {
        const { id: _id, ...rest } = anonymizableResult.data;

        const dataResult = z
            .object({ data: z.unknown() })
            .passthrough()
            .refine((val) => val.data !== undefined)
            .safeParse(rest);
        if (dataResult.success) {
            const anonymized = {
                ...rest,
                data: anonymize(dataResult.data.data),
            };

            return anonymized;
        }

        return rest;
    }

    const arrayResult = z.array(z.unknown()).safeParse(denormalized);
    if (arrayResult.success) {
        const anonymized = arrayResult.data.map((value) => anonymize(value));
        return anonymized;
    }

    const recordResult = z
        .record(z.string(), z.unknown())
        .safeParse(denormalized);
    if (recordResult.success) {
        const anonymized = Object.fromEntries(
            Object.entries(recordResult.data).map(([key, value]) => [
                key,
                anonymize(value),
            ]),
        );

        return anonymized;
    }

    return denormalized;
};
