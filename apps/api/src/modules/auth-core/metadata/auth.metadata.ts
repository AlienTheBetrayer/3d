import { SetMetadata } from "@nestjs/common";

/**
 * sets the metadata for the authentication redirect (could be used for anything)
 * @param redirect redirect url (probably FE website or route)
 */
export const AuthenticationSuccessRedirect = (redirect: string) => {
  return SetMetadata("authentication-success-redirect", redirect);
};

/**
 * sets the metadata for the authentication redirect (could be used for anything)
 * @param redirect redirect url (probably FE website or route)
 */
export const AuthenticationFailureRedirect = (redirect: string) => {
  return SetMetadata("authentication-failure-redirect", redirect);
};
