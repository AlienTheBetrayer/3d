import { SetMetadata } from "@nestjs/common";

export const SKIP_AUTH_INTERCEPTOR_KEY = "skipGlobalInterceptor";
export const SkipAuthInterceptor = () => SetMetadata(SKIP_AUTH_INTERCEPTOR_KEY, true);
