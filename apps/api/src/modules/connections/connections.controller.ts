import { Body, Controller, Delete, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { contracts } from "@repo/contracts";
import { type Response } from "express";
import { AuthContext, type AuthContextType } from "../auth-core/decorators/authcontext.decorator.js";
import { AuthenticatedUser, type AuthenticatedUserType } from "../auth-core/decorators/index.js";
import { AuthenticatedGuard } from "../auth-core/guards/authenticated.guard.js";
import { SkipAuthInterceptor } from "../auth-core/interceptors/auth.interceptor.metadata.js";
import { AppJwtService } from "../jwt/jwt.service.js";
import { ConnectionsService } from "./connections.service.js";
import { ConnectionLoginGuard } from "./guards/connectionlogin.guard.js";
import { ConnectionMemberGuard } from "./guards/connectionmember.guard.js";
import { ConnectionOwnerGuard } from "./guards/connectionowner.guard.js";
import { GroupMemberGuard } from "./guards/groupmember.guard.js";
import { GroupOwnerGuard } from "./guards/groupowner.guard.js";

@Controller("connections")
export class ConnectionsController {
  constructor(
    private readonly connectionsService: ConnectionsService,
    private readonly jwtService: AppJwtService,
  ) {}

  /**
   * gets all the currently connected auth sessions in groups
   * @returns sessions categorized by its connection (id + title + emoji)
   */
  @UseGuards(AuthenticatedGuard)
  @Get()
  async connections(@AuthenticatedUser() user: AuthenticatedUserType): Promise<contracts.connections.GetResponse> {
    const groups = await this.connectionsService.connections(user.id);
    return { groups };
  }

  /**
   * issues the code in order to authenticate as the owner
   * @returns true if succeded.
   */
  @UseGuards(AuthenticatedGuard, ConnectionMemberGuard)
  @Post("code")
  async connectionCode(
    @Body({ schema: contracts.connections.code }) body: contracts.connections.Code,
  ): Promise<contracts.connections.CodeResponse> {
    const ret = await this.connectionsService.connectionCode(body);
    return ret;
  }

  /**
   * relogins you with a different connection. (only works if you're a member of it)
   * @param connectionId id of the connection
   * @returns
   */
  @SkipAuthInterceptor()
  @UseGuards(AuthenticatedGuard, ConnectionMemberGuard, ConnectionLoginGuard)
  @Post("login")
  async connectionLogin(
    @Body({ schema: contracts.connections.login }) body: contracts.connections.Login,
    @AuthContext() ctx: AuthContextType,
    @AuthenticatedUser() authenticatedUser: AuthenticatedUserType,
    @Res({ passthrough: true }) response: Response,
  ): Promise<contracts.connections.LoginResponse> {
    // logging out first (tokens)
    this.jwtService.deleteAuthTokens({ response, type: "all" });

    // validating + creating the session/tokens
    const { accessToken, refreshToken, connection, session, user } = await this.connectionsService.connectionLogin(
      body,
      ctx,
      authenticatedUser,
    );

    // setting tokens
    this.jwtService.setAuthHttpCookies({
      accessToken,
      refreshToken,
      response,
    });

    return { accessToken, refreshToken, session, connection, user };
  }

  /**
   * adds the user for a connection. (does not authenticate)
   * @param email email address
   * @param password secure password
   * @param code code that was sent to email (use /code/)
   * @param groupId id of the group
   * @param connectionId optional id of the connection
   * @returns authentication tokens, user and a session
   */
  @UseGuards(AuthenticatedGuard, GroupMemberGuard)
  @Post("add")
  async connectionAdd(
    @Body({ schema: contracts.connections.add }) body: contracts.connections.Add,
  ): Promise<contracts.connections.AddResponse> {
    // authenticating
    const ret = await this.connectionsService.connectionAdd(body);
    return ret;
  }

  /**
   * deletes the connection by its id (have to be an owner)
   * @param connectionId id of the connection to delete
   * @returns
   */
  @UseGuards(AuthenticatedGuard, ConnectionOwnerGuard)
  @Delete()
  async connectionDelete(
    @Body({ schema: contracts.connections.delete_ }) body: contracts.connections.Delete,
  ): Promise<contracts.connections.DeleteResponse> {
    const connection = await this.connectionsService.connectionDelete(body);
    return { connection };
  }

  /**
   * @param service service to authenticate
   * @param groupId id of the group
   */
  @UseGuards(AuthenticatedGuard, GroupOwnerGuard)
  @Get("connection/init")
  async connectionInit(
    @Query({ schema: contracts.connections.init }) query: contracts.connections.Init,
    @Res({ passthrough: true }) response: Response,
  ): Promise<contracts.connections.InitResponse> {
    response.redirect(`http://localhost:3001/oauth/${query.service}?action=connect&groupId=${query.groupId}`);
  }
}
