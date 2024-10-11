import { LocalStorageFormKey } from "@/types/data-types";
import { useEffect } from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";

export default function usePersistFormData<T extends FieldValues>(
  key: LocalStorageFormKey,
  {
    watch,
    excludes,
  }: {
    watch: UseFormWatch<T>;
    excludes?: (keyof T)[];
  },
) {
  const formValue = watch();
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(formValue));
  }, [key, formValue]);
}
