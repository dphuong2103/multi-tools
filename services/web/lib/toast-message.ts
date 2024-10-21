import { Locale } from "@/i18n.config";
import { TError } from "@/types/data-types";

export function parseErrorMessage(errors: TError[], locale: Locale) {
  return errors.reduce((acc, error) => {
    if (!acc) {
      return `${error[locale as keyof TError]}.`;
    }
    return `${acc} ${error[locale as keyof TError]}.`;
  }, "");
}
