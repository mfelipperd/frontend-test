import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface ControlledInputProps<T extends FieldValues = FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  mask?: (value: any) => string;
  className?: string;
}

const InputControlled = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  mask,
  disabled = false,
  type = "text",
  placeholder,
  ...rest
}: ControlledInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={rest.className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              disabled={disabled}
              type={type}
              placeholder={placeholder}
              value={mask ? mask(field.value) : field.value}
              onChange={field.onChange}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputControlled;
