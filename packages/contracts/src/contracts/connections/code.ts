import z from "zod";

export const code = z.object({
  connectionId: z.nanoid(),
});

export type Code = z.infer<typeof code>;

export type CodeResponse = boolean;
