import { FieldValues, useFormContext, Controller, Path } from "react-hook-form";
import type { DefaultForm } from "@repo/forms/auth";
import { Checkbox } from "../checkbox";
import { Field, FieldError, FieldLabel } from "../field";

export default function FormCheckbox<T extends FieldValues = DefaultForm>({
  name,
  label,
}: {
  name: Path<T>;
  label?: string;
}) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal">
          <Checkbox checked={field.value} onCheckedChange={field.onChange} aria-invalid={fieldState.invalid} />

          {label && <FieldLabel>{label}</FieldLabel>}

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
