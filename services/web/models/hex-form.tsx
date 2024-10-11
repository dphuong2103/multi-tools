import { z } from "zod";
import { isValidHex } from "@/lib/hex";
import { Dictionary } from "@/lib/dictionary";
export const operations = ["encode", "decode"] as const;
export function createHexFormSchema(dictionary: Dictionary) {
  return z
    .object({
      operation: z.enum(operations),
      input: z.string().min(1, "Required"),
    })
    .refine(
      (val) => {
        if (val.operation === "encode") return true;
        if (isValidHex(val.input)) return true;
        return false;
      },
      {
        message: dictionary.page.hex.fields.input.errors.invalid_hex_string,
        path: ["input"],
      },
    );
}

export type HexFormModel = z.infer<ReturnType<typeof createHexFormSchema>>;
export type LoginFormError = z.ZodError<HexFormModel>;
