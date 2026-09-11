import fieldInput from './fieldInput';
import fieldCheckbox from './fieldCheckbox';
import * as z from 'zod';

export default function Form(form: z.form.ZodForm) {
  return <form></form>;
}

Form.Input = fieldInput;
Form.Checkbox = fieldCheckbox;
