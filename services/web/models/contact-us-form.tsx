import { z } from "zod";
import { nonEmptyString } from "./z-custom";

export const contactUsFormSchema = z.object({
  name: nonEmptyString,
  email: nonEmptyString.email("Please input valid email!"),
  message: nonEmptyString,
});

export type ContactUsFormModel = z.infer<typeof contactUsFormSchema>;
export type ContactUsFormError = z.ZodError<ContactUsFormModel>;
