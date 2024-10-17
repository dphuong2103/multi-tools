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
    if (!excludes) {
      localStorage.setItem(key, JSON.stringify(formValue));
      return;
    }
    const data = Object.fromEntries(
      Object.entries(formValue).filter(
        ([key]) => !excludes.includes(key as keyof T),
      ),
    );
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, formValue, excludes]);
}
