import { Dictionary } from "@/lib/dictionary";
import { z } from "zod";
export const operations = ["encode", "decode"] as const;
export function createBase64FormSchema(dictionary: Dictionary) {
  return z
    .object({
      operation: z.enum(operations),
      input: z.string().min(1, "Required"),
    })
    .refine(
      (val) => {
        if (val.operation === "encode") return true;
        try {
          window.atob(val.input);
        } catch {
          return false;
        }
        return true;
      },
      {
        message:
          dictionary.page.base64.fields.input.errors.invalid_base64_string,
        path: ["input"],
      },
    );
}

export type Base64FormModel = z.infer<
  ReturnType<typeof createBase64FormSchema>
>;
export type LoginFormError = z.ZodError<Base64FormModel>;
