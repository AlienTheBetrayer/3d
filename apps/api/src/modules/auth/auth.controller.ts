import { Body, Controller, Delete, Get, Post, Res, UseGuards } from "@nestjs/common";

import { contracts } from "@repo/contracts";
import { Exception } from "../../shared/lib/exception.js";
import { AuthContext, type AuthContextType } from "../auth-core/decorators/authcontext.decorator.js";
import { AuthenticatedUser, type AuthenticatedUserType } from "../auth-core/decorators/authenticateduser.decorator.js";
import { RefreshToken, type RefreshTokenType } from "../auth-core/decorators/refreshtoken.decorator.js";
import { AuthenticatedGuard } from "../auth-core/guards/authenticated.guard.js";
import { NotAuthenticatedGuard } from "../auth-core/guards/notauthenticated.guard.js";
import { AppJwtService } from "../jwt/jwt.service.js";
import { AuthService } from "./auth.service.js";
import { type Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: AppJwtService,
  ) {}

  /**
   * validates and sends an authentication code via email
   * @param email email to issue the code to
   * @param type type of the code
   * @param action regular login code or connection to an owner
   * @returns true if the code was generated
   */
  @UseGuards(NotAuthenticatedGuard)
  @Post("code")
  async code(@Body({ schema: contracts.auth.code }) body: contracts.auth.Code): Promise<contracts.auth.CodeResponse> {
    await this.authService.code(body);
    return true;
  }

  /**
   * signs the user up. (throws if already authenticated)
   * @param email email address
   * @param password secure password
   * @param code code that was sent to email (use /code/)
   * @returns user object
   */
  @UseGuards(NotAuthenticatedGuard)
  @Post("signup")
  async signup(
    @Body({ schema: contracts.auth.signup }) body: contracts.auth.Signup,
  ): Promise<contracts.auth.SignupResponse> {
    const user = await this.authService.signup(body);
    return { user } ;
  }

  /**
   * authenticates the user. (throws if already authenticated)
   * @param email email address
   * @param password secure password
   * @param code code that was sent to email (use /code/)
   * @returns authentication tokens, user and a session
   */
  @UseGuards(NotAuthenticatedGuard)
  @Post("login")
  async login(
    @Body({ schema: contracts.auth.login }) body: contracts.auth.Login,
    @AuthContext() ctx: AuthContextType,
    @Res({ passthrough: true }) response: Response,
  ): Promise<contracts.auth.LoginResponse> {
    // authenticating
    const { accessToken, refreshToken, session, user } = await this.authService.login(body, ctx);

    this.jwtService.setAuthHttpCookies({
      accessToken,
      refreshToken,
      response,
    });

    return { accessToken, refreshToken, session, user };
  }

  /**
   * changes the password.
   * @param email email address (required)
   * @param password password (required, will be hashed)
   * @param code (optional, used to verify)
   * @returns new user object
   */
  @UseGuards(NotAuthenticatedGuard)
  @Post("forgot-password")
  async forgotPassword(
    @Body({ schema: contracts.auth.forgotPassword }) body: contracts.auth.ForgotPassword,
  ): Promise<contracts.auth.ForgotPasswordResponse> {
    const user = await this.authService.forgotPassword(body);
    return { user };
  }

  /**
   * gets the currently logged in user (yourself).
   * @param refreshToken refresh token
   * @returns user object
   */
  @UseGuards(AuthenticatedGuard)
  @Get("me")
  me(@AuthenticatedUser() user: AuthenticatedUserType): contracts.auth.MeResponse {
    const { session, ...userObject } = user;
    return { session, user: userObject };
  }

  /**
   * logs out currently logged in session. (throws if not authenticated)
   * @param refreshToken current logged in refresh token
   * @returns succesful log out should return a session
   */
  @UseGuards(AuthenticatedGuard)
  @Delete("logout")
  async logout(
    @RefreshToken() refreshToken: RefreshTokenType,
    @Res({ passthrough: true }) response: Response,
  ): Promise<contracts.auth.LogoutResponse> {
    // validating tokens
    if (!refreshToken) {
      throw Exception.unauthorized("UNAUTHORIZED", "no refresh token. already logged out");
    }

    const decoded = this.jwtService.verify({
      token: refreshToken,
      key: "REFRESH_TOKEN_SECRET",
    });

    // clearing the token
    this.jwtService.deleteAuthTokens({ response, type: "all" });

    // logging out
    const session = await this.authService.logout(decoded.sessionId);
    return { session };
  }
}
