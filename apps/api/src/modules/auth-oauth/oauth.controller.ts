import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { type Response } from "express";
import { AuthContext,type  AuthContextType } from "../auth-core/decorators/authcontext.decorator.js";
import { NotAuthenticatedGuard } from "../auth-core/guards/notauthenticated.guard.js";
import { AuthenticationFailureRedirect } from "../auth-core/metadata/auth.metadata.js";
import { NotConnectedGuard } from "../connections/guards/notconnected.guard.js";
import { ConnectionFailureRedirect } from "../connections/metadata/connection.metadata.js";
import { OAuthIdentity, type OAuthIdentityType } from "./decorators/oauthidentity.decorator.js";
import { DiscordGuard } from "./guards/discord.guard.js";
import { GithubGuard } from "./guards/github.guard.js";
import { GoogleGuard } from "./guards/google.guard.js";
import { OAuthService } from "./oauth.service.js";
import { redirectErrorURL } from "./oauth.types.js";

@Controller("oauth")
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  /**
   * used to initiate the google authentication process
   */
  @Get("google")
  @AuthenticationFailureRedirect(redirectErrorURL("ALREADY_AUTHORIZED"))
  @UseGuards(GoogleGuard, NotAuthenticatedGuard, NotConnectedGuard)
  googleAuth() {}

  /**
   * finished google authentication session
   * @param request request object
   * @param response response object
   * @returns redirects the user back to the frontend
   */
  @ConnectionFailureRedirect(redirectErrorURL("USER_ALREADY_EXISTS"))
  @AuthenticationFailureRedirect(redirectErrorURL("ALREADY_AUTHORIZED"))
  @Get("google/callback")
  @UseGuards(GoogleGuard, NotAuthenticatedGuard, NotConnectedGuard)
  async googleCallback(
    @OAuthIdentity() identity: OAuthIdentityType,
    @AuthContext() ctx: AuthContextType,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.oauthService.callback(identity, ctx, response);
  }

  /**
   * used to initiate the github authentication process
   */
  @AuthenticationFailureRedirect(redirectErrorURL("ALREADY_AUTHORIZED"))
  @Get("github")
  @UseGuards(GithubGuard, NotAuthenticatedGuard, NotConnectedGuard)
  githubAuth() {}

  /**
   * finished github authentication session
   * @param request request object
   * @param response response object
   * @returns redirects the user back to the frontend
   */
  @ConnectionFailureRedirect(redirectErrorURL("USER_ALREADY_EXISTS"))
  @AuthenticationFailureRedirect(redirectErrorURL("ALREADY_AUTHORIZED"))
  @Get("github/callback")
  @UseGuards(GithubGuard, NotAuthenticatedGuard, NotConnectedGuard)
  async githubCallback(
    @OAuthIdentity() identity: OAuthIdentityType,
    @AuthContext() ctx: AuthContextType,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.oauthService.callback(identity, ctx, response);
  }

  /**
   * used to initiate the discord authentication process
   */
  @AuthenticationFailureRedirect(redirectErrorURL("ALREADY_AUTHORIZED"))
  @Get("discord")
  @UseGuards(DiscordGuard, NotAuthenticatedGuard, NotConnectedGuard)
  discordAuth() {}

  /**
   * finished discord authentication session
   * @param request request object
   * @param response response object
   * @returns redirects the user back to the frontend
   */
  @ConnectionFailureRedirect(redirectErrorURL("USER_ALREADY_EXISTS"))
  @AuthenticationFailureRedirect(redirectErrorURL("ALREADY_AUTHORIZED"))
  @Get("discord/callback")
  @UseGuards(DiscordGuard, NotAuthenticatedGuard, NotConnectedGuard)
  async discordCallback(
    @OAuthIdentity() identity: OAuthIdentityType,
    @AuthContext() ctx: AuthContextType,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.oauthService.callback(identity, ctx, response);
  }
}
