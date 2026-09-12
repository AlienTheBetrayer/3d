import { Button, type ButtonProps } from "../button";

export default function FormSubmit({ type = "submit", children, ...props }: ButtonProps) {
  return (
    <Button type={type} {...props}>
      {children}
    </Button>
  );
}
