import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getAuthenticateOptions } from "./lib.js";

@Injectable()
export class GoogleGuard extends AuthGuard("google") {
  async getAuthenticateOptions(context: ExecutionContext) {
    return await getAuthenticateOptions(context);
  }
}
