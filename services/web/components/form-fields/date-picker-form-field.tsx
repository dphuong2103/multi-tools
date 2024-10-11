import React from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { cn } from "@/lib/utils";
import DatePicker from "../ui/date-picker";
import { RequiredFields } from "@/types/data-types";

interface DatePickerFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends RequiredFields<
      Omit<ControllerProps<TFieldValues, TName>, "render">,
      "control"
    >,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name"> {
  label?: string;
  placeholder?: string;
  className?: string;
  inputFieldClassName?: string;
}

function DatePickerFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  required,
  className,
  inputFieldClassName,
}: DatePickerFormFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col justify-start", className)}>
          {label && (
            <FormLabel className="text-gray-500 dark:text-gray-500 text-xs">
              {label} {required && "*"}
            </FormLabel>
          )}
          <FormControl>
            <DatePicker
              selectedDate={field.value}
              setSelectedDate={field.onChange}
              className={inputFieldClassName}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DatePickerFormField;
