import { z } from "zod";
import { isValidHex } from "@/lib/hex";


export const hexFormSchema = z.discriminatedUnion("operation", [
    z.object({
        operation: z.literal("encode"), value: z.string().min(1, "Required")
    }),
    z.object({
        operation: z.literal("decode"), value: z.string().min(1, "Required").refine((val) => isValidHex(val), {
            message: "Invalid hex input"
        })
    }),
]);


export type HexFormModel = z.infer<typeof hexFormSchema>;
export type LoginFormError = z.ZodError<HexFormModel>;
