import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { getAuthenticateOptions } from "./lib.js";

@Injectable()
export class GithubGuard extends AuthGuard("github") {
  async getAuthenticateOptions(context: ExecutionContext) {
    return await getAuthenticateOptions(context);
  }
}
