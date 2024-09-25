import { z } from "zod";

export const base64FormSchema = z.discriminatedUnion("operation", [
  z.object({
    operation: z.literal("encode"),
    value: z.string().min(1, "Required"),
  }),
  z.object({
    operation: z.literal("decode"),
    value: z.string().min(1, "Required"),
  }),
]);

export type Base64FormModel = z.infer<typeof base64FormSchema>;
export type LoginFormError = z.ZodError<Base64FormModel>;
