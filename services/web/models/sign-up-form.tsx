import { z } from "zod";
import { nonEmptyString } from "./z-custom";

export const signUpFormSchema = z
  .object({
    email: nonEmptyString.email("Please input valid email!"),
    password: nonEmptyString.min(
      6,
      "Password must be at least 6 characters long.",
    ),
    confirmPassword: nonEmptyString,
    firstName: nonEmptyString,
    lastName: nonEmptyString,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpFormModel = z.infer<typeof signUpFormSchema>;
export type SignUpFormError = z.ZodError<SignUpFormModel>;
