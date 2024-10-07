import { useEffect } from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";

export default function usePersistReactHookForm<T extends FieldValues>(
  key: string,
  {
    watch,
  }: {
    watch: UseFormWatch<T>;
  },
) {
  const formValue = watch();
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(formValue));
  }, [key, formValue]);
}
