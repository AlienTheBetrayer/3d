import { z } from "zod";
import { contracts } from "@repo/contracts";
import { ExceptionCodes, ExceptionCode } from "../../shared/lib/exception.js";

/**
 * oauth identity retrieved from services schema
 */
export const oAuthIdentitySchema = z.object({
  provider: contracts.connections.init.shape.service,
  providerId: z.string(),
  email: z.email().optional(),
  name: z.string(),
  profileUrl: z.string().optional(),
  error: z.enum(ExceptionCodes).optional(),
  metadata: z.object({
    action: z.enum(["login", "connect"]).optional(),
    groupId: z.nanoid().optional(),
  }),
});

export type oAuthIdentityMetadata = z.infer<typeof oAuthIdentitySchema.shape.metadata>;

/**
 * github api
 */
export type GithubUserEmails = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: "public" | "private";
};

/**
 * error redirect url
 */
export const redirectErrorURL = (code: ExceptionCode) => {
  return `http://localhost:3000/login?error=${code}`;
};
