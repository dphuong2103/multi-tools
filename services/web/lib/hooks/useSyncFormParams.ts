import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";

export default function useSyncFormParams<T extends FieldValues>({
  watch,
  includes,
  excludes,
}: {
  watch: UseFormWatch<T>;
  includes?: [keyof T];
  excludes?: [keyof T];
}) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const formData = watch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (includes) {
      for (const [key, value] of Object.entries(formData)) {
        if (!includes.includes(key as keyof T)) {
          continue;
        }
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
    } else {
      for (const [key, value] of Object.entries(formData)) {
        if (excludes?.includes(key as keyof T)) continue;
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }, [formData, includes, pathname, replace, searchParams, excludes]);
}
