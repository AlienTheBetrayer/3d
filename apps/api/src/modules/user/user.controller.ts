import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { contracts } from "@repo/contracts";
import { AuthenticatedGuard } from "../auth-core/guards/authenticated.guard.js";
import { UserGuard } from "./guards/user.guard.js";
import { UserNotFoundGuard } from "./guards/usernotfound.guard.js";
import { UserService } from "./user.service.js";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * gets the user by id
   * @param params params with id
   * @returns user
   */
  @Get("id/:userId")
  async get(@Param({ schema: contracts.user.get }) params: contracts.user.Get): Promise<contracts.user.GetResponse> {
    const user = (await this.userService.get(params)) ?? null;
    return { user };
  }

  /**
   * gets the user by username
   * @param params params with username
   * @returns user
   */
  @Get("username/:username")
  async getByUsername(
    @Param({ schema: contracts.user.getByUsername }) params: contracts.user.GetByUsername,
  ): Promise<contracts.user.GetByUsernameResponse> {
    const user = (await this.userService.getByUsername(params)) ?? null;
    return { user };
  }

  /**`
   * creates a new user (hashes the password)
   * @param email email address
   * @param password raw password
   * @returns user object, throws if email already taken
   */
  @Post()
  @UseGuards(AuthenticatedGuard, UserNotFoundGuard)
  async create(
    @Body({ schema: contracts.user.create }) body: contracts.user.Create,
  ): Promise<contracts.user.CreateResponse> {
    const user = (await this.userService.create(body)) ?? null;
    return { user };
  }

  /**
   * deletes the user
   * @param key key (id or email)
   * @returns deleted user
   */
  @Delete()
  @UseGuards(AuthenticatedGuard, UserGuard)
  async delete(
    @Body({ schema: contracts.user.delete_ }) body: contracts.user.Delete,
  ): Promise<contracts.user.DeleteResponse> {
    const user = await this.userService.delete(body);
    return { user };
  }

  /**
   * edits the user
   * @param body body
   * @returns edited user
   */
  @Patch()
  @UseGuards(AuthenticatedGuard, UserGuard)
  async edit(@Body({ schema: contracts.user.edit }) body: contracts.user.Edit): Promise<contracts.user.EditResponse> {
    const user = (await this.userService.edit(body)) ?? null;
    return { user };
  }
}
