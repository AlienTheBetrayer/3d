"use client";

import Form, { useZodForm } from "@/shared/ui/form/form";
import { forms } from "@repo/forms";

export default function FormPage() {
  const { form } = useZodForm(forms.auth.login, {
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const handleLogin = (values: forms.auth.Login) => {
    void values;
  };

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <Form form={form} onSubmit={handleLogin}>
        <Form.Input name="email" label="Email" placeholder="Email" />
        <Form.Input name="password" label="Password" type="password" />
        <Form.Checkbox name="remember" label="Remember me" />
        <Form.Submit>Sign in</Form.Submit>
      </Form>
    </main>
  );
}
