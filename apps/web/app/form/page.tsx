"use client";

import { defaultForm, type DefaultForm } from "@repo/forms/auth";
import Form, { useZodForm } from "@/shared/ui/form/form";

export default function FormPage() {
  const { form } = useZodForm(defaultForm, {
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const handleLogin = (values: DefaultForm) => {
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
