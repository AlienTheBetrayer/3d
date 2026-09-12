"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui";
import Form, { useZodForm } from "@/shared/ui/form/form";
import { contracts } from "@repo/contracts";

export default function FormPage() {
  const { form } = useZodForm(contracts.auth.login, {
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (values: contracts.auth.Login) => {
    void values;
  };

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <Card className="w-full max-w-96">
        <CardHeader>
          <CardTitle>Form</CardTitle>
          <CardDescription>Use this form to authenticate!</CardDescription>
        </CardHeader>

        <Form
          form={form}
          onSubmit={handleLogin}
        >
          <CardContent className="flex flex-col gap-4">
            <Form.Input
              name="email"
              label="Email"
              placeholder="Email"
              id="email"
            />
            <Form.Input
              name="password"
              label="Password"
              type="password"
              id="password"
            />
          </CardContent>

          <CardFooter className="mt-4">
            <Form.Submit className="w-full">Sign in</Form.Submit>
          </CardFooter>
        </Form>
      </Card>
    </main>
  );
}
