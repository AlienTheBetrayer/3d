import z from "zod";
import { passwordSchema } from "../../../shared/auth.js";

export const login = z.object({
  email: z.email(),
  password: passwordSchema
});