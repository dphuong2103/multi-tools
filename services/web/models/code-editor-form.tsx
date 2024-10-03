import { z } from "zod";
import { nonEmptyString } from "./z-custom";
import { programmingLanguages } from "@/constants/programming-languages";

export const codeEditorFormSchema = z.object({
  language: z.enum(programmingLanguages),
  input: nonEmptyString,
});

export type CodeEditorFormModel = z.infer<typeof codeEditorFormSchema>;
export type CodeEditorFormError = z.ZodError<CodeEditorFormModel>;
