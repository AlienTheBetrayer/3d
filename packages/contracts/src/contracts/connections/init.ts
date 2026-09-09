import z from "zod";

export const init = z.object({
  service: z.enum(["github", "google", "discord", "telegram"]),
  groupId: z.nanoid(),
});

export type Init = z.infer<typeof init>;

export type InitResponse = void;
