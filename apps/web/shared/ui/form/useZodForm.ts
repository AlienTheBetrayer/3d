"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm, type FieldValues, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

export function useZodForm<TFieldValues extends FieldValues>(
  formSchema: z.ZodType<TFieldValues>,
  options?: Omit<UseFormProps<TFieldValues>, "resolver">,
): { form: UseFormReturn<TFieldValues> } {
  const form = useForm<TFieldValues>({
    resolver: zodResolver(formSchema as never),
    ...options,
  });

  return useMemo(() => ({ form }), [form]);
}
