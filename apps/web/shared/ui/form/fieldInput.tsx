import { FieldValues, useFormContext, Controller, Path } from "react-hook-form";
import type { DefaultForm } from "@repo/forms/auth";
import { Input } from "../input";
import { Field, FieldError, FieldLabel } from "../field";

export default function FormInput<T extends FieldValues = DefaultForm>({
  name,
  label,
  ...props
}: { name: Path<T>; label?: string } & Omit<React.ComponentProps<typeof Input>, "name">) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel>{label}</FieldLabel>}

          <Input {...field} {...props} aria-invalid={fieldState.invalid} />

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
