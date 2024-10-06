import { sqlLanguages } from "@/constants/sql-languages";
import { z } from "zod";
import { nonEmptyString } from "./z-custom";

export const sqlFormatterFormSchema = z.object({
  language: z.enum(sqlLanguages),
  input: nonEmptyString,
  tabWidth: z.coerce.number().int().min(0),
  keywordCase: z.enum(["upper", "lower", "preserve"]),
  linesBetweenQueries: z.coerce.number().int().min(0),
  functionCase: z.enum(["upper", "lower", "preserve"]),
  dataTypeCase: z.enum(["upper", "lower", "preserve"]),
});

export type SqlFormatterFormModel = z.infer<typeof sqlFormatterFormSchema>;
export type SqlFormatterFormError = z.ZodError<SqlFormatterFormModel>;
