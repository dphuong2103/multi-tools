import React, { forwardRef, LegacyRef } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { TimePickerInput } from "../ui/time-picker-input";
import { RequiredFields } from "@/types/data-types";

interface TimePickerFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends RequiredFields<
      Omit<ControllerProps<TFieldValues, TName>, "render">,
      "control"
    >,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name"> {
  label?: string;
  picker: "hours" | "minutes" | "seconds";
  placeholder?: string;
}

function TimePickerFormFieldImpl<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  {
    control,
    name,
    label,
    required,
    picker,
    placeholder,
  }: TimePickerFormFieldProps<TFieldValues, TName>,
  ref?: LegacyRef<HTMLInputElement>,
) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-start">
          {label && (
            <FormLabel className="text-gray-500 dark:text-gray-500 text-xs">
              {label} {required && "*"}
            </FormLabel>
          )}
          <FormControl>
            <TimePickerInput
              date={field.value as Date}
              setDate={(date: Date | undefined) => field.onChange(date)}
              picker={picker}
              ref={ref}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

const TimePickerFormField = forwardRef(TimePickerFormFieldImpl);

export default TimePickerFormField;
