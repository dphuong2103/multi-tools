import { sqlLanguages } from "@/constants/sql-languages";
import { z } from "zod";
import { nonEmptyString } from "./z-custom";
export const textCases = ["upper", "lower", "preserve"] as const;

export const sqlFormatterFormSchema = z.object({
  language: z.enum(sqlLanguages),
  input: nonEmptyString,
  tabWidth: z.coerce.number().int().min(0),
  keywordCase: z.enum(textCases),
  linesBetweenQueries: z.coerce.number().int().min(0),
  functionCase: z.enum(textCases),
  dataTypeCase: z.enum(textCases),
});

export type SqlFormatterFormModel = z.infer<typeof sqlFormatterFormSchema>;
export type SqlFormatterFormError = z.ZodError<SqlFormatterFormModel>;
