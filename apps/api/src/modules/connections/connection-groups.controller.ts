import { Controller, UseGuards, Post, Body, Patch, Delete } from "@nestjs/common";
import { contracts } from "@repo/contracts";
import { AuthenticatedUser, type AuthenticatedUserType } from "../auth-core/decorators/index.js";
import { AuthenticatedGuard } from "../auth-core/guards/authenticated.guard.js";
import { ConnectionsService } from "./connections.service.js";
import { GroupOwnerGuard } from "./guards/groupowner.guard.js";

@Controller("connection-groups")
export class ConnectionGroupsController {
  constructor(private readonly connectionsService: ConnectionsService) {}

  /**
   * creates a group that can link multiple sessions
   * @param title required title
   * @param emoji optional emoji
   * @returns group
   */
  @UseGuards(AuthenticatedGuard)
  @Post("group/add")
  async groupAdd(
    @Body({ schema: contracts.connectionGroups.create }) body: contracts.connectionGroups.Create,
    @AuthenticatedUser() user: AuthenticatedUserType,
  ): Promise<contracts.connectionGroups.CreateResponse> {
    const data = await this.connectionsService.groupAdd(body, user);
    return data;
  }

  /**
   * edits the group (works only if you're the owner)
   * @param groupId id of the group
   * @param title title
   * @param emoji emoji
   * @returns updated group
   */
  @UseGuards(AuthenticatedGuard, GroupOwnerGuard)
  @Patch("group/edit")
  async groupEdit(
    @Body({ schema: contracts.connectionGroups.edit }) body: contracts.connectionGroups.Edit,
  ): Promise<contracts.connectionGroups.EditResponse> {
    const group = await this.connectionsService.groupEdit(body);
    return { group };
  }

  /**
   * deletes a group (works only if you're the owner)
   * @param groupId id of the group
   * @returns deleted group
   */
  @UseGuards(AuthenticatedGuard, GroupOwnerGuard)
  @Delete("group/delete")
  async groupDelete(
    @Body({ schema: contracts.connectionGroups.delete_ }) body: contracts.connectionGroups.Delete,
  ): Promise<contracts.connectionGroups.DeleteResponse> {
    const group = await this.connectionsService.groupDelete(body);
    return { group };
  }
}
