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
import { Textarea } from "../ui/textarea";

interface TextInputFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render">,
    Omit<React.HTMLProps<HTMLTextAreaElement>, "defaultValue" | "name"> {
  label?: string;
  placeholder?: string;
}

function TextAreaFormField<
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
        <FormItem>
          {/* {label && (
                        <FormLabel className="text-gray-500 dark:text-gray-500 text-xs">
                            {label} {required && "*"}
                        </FormLabel>
                    )} */}
          <FormControl>
            <Textarea placeholder={placeholder} {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default TextAreaFormField;
