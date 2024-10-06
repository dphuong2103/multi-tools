import React, { HTMLAttributes } from "react";

import { Input } from "../ui/input";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface TextInputFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render">,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "name"> {
  label?: string;
  placeholder?: string;
}

function TextInputFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  required,
  ...inputProps
}: TextInputFormFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-0">
          {label && (
            <FormLabel className="text-xs">
              {label} {required && "*"}
            </FormLabel>
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextInputFormField;
