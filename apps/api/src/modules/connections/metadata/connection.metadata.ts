import { SetMetadata } from "@nestjs/common";

/**
 * sets the metadata for the connection redirect (could be used for anything)
 * @param redirect redirect url (probably FE website or route)
 */
export const ConnectionSuccessRedirect = (redirect: string) => {
  return SetMetadata("connection-success-redirect", redirect);
};

/**
 * sets the metadata for the connection redirect (could be used for anything)
 * @param redirect redirect url (probably FE website or route)
 */
export const ConnectionFailureRedirect = (redirect: string) => {
  return SetMetadata("connection-failure-redirect", redirect);
};
