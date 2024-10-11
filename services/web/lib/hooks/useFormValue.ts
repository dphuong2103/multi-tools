import { useSearchParams } from "next/navigation";

const useFormValue = () => {
  const searchParams = useSearchParams();
  function getFormValue<T>(
    searchParamKey: string,
    {
      localStorageData,
      initialValue,
      validationFn,
    }: {
      localStorageData: T;
      initialValue: T;
      validationFn?: (value: string) => boolean;
    },
  ) {
    let value: string | null | T = searchParams.get(searchParamKey);
    if (!value) {
      value = localStorageData ?? initialValue;
    } else if (validationFn && !validationFn(value)) {
      value = localStorageData ?? initialValue;
    }
    return value as T;
  }
  return { getFormValue };
};

export default useFormValue;
