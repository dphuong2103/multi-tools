import { z } from "zod";
import { nonEmptyString } from "./z-custom";

const ProgrammingLanguages = ["javascript", "typescript", "sql"] as const;

export const codeEditorSchema = z.object({
    language: z.enum(ProgrammingLanguages),
    input: nonEmptyString,
});

export type CodeEditorFormModel = z.infer<typeof codeEditorSchema>;
export type CodeEditorFormError = z.ZodError<CodeEditorFormModel>;
