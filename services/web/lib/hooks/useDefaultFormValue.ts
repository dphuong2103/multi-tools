import { LocalStorageFormKey } from "@/types/data-types";
import useFormValue from "./useFormValue";

export default function useDefaultFormValues<T>(
  key: LocalStorageFormKey,
  fieldConfigs: {
    [K in keyof T]: {
      initialValue: T[K];
      validationFn?: (value: string) => boolean;
    };
  },
) {
  const savedData =
    typeof window !== "undefined" ? localStorage?.getItem(key) : null;
  const savedDataParsed = (savedData ? JSON.parse(savedData) : {}) as T;
  const { getFormValue } = useFormValue();
  const defaultValues: Partial<T> = {};

  for (const fieldKey in fieldConfigs) {
    const { initialValue, validationFn } = fieldConfigs[fieldKey];
    defaultValues[fieldKey as keyof T] = getFormValue(fieldKey, {
      initialValue: initialValue,
      localStorageData: savedDataParsed[fieldKey as keyof T],
      validationFn: validationFn,
    });
  }

  return defaultValues as T;
}
