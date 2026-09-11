import { Injectable } from "@nestjs/common";
import { db } from "@repo/db";
import { Request } from "express";
import z from "zod";
import { RequestParser } from "../../shared/index.js";
import { DrizzleService } from "../drizzle/drizzle.service.js";
import { and, eq } from "drizzle-orm";
import { users } from "../../../../../packages/db/dist/core/tables.js";

@Injectable()
export class ConnectionsCoreService {
  constructor(private drizzleService: DrizzleService) {}

  /**
   * validates whether you're a member/owner of the group by "groupId" in your body/query. (have to run after AuthGuards)
   * @param request request object
   * @param type type of the validation
   * @returns true if validated, throws if otherwise
   */
  async verifyGroup(request: Request, type: "membership" | "ownership") {
    // parsing
    const parser = new RequestParser(request);
    const user = parser.user();
    const group = parser.body({ groupId: z.nanoid() });

    let validated: db.Connections | db.ConnectionsGroup | undefined;

    switch (type) {
      case "membership": {
        validated = await this.drizzleService.db.query.connections.findFirst({
          where: and(eq(db.connections.group_id, group.groupId), eq(db.connections.user_id, user.id)),
        });

        break;
      }

      case "ownership": {
        validated = await this.drizzleService.db.query.connections_group.findFirst({
          where: and(eq(db.connections_group.id, group.groupId), eq(db.connections_group.owner_user_id, user.id)),
        });

        break;
      }
    }

    if (!validated) {
      throw new Error("group has not been validatd.");
    }

    return true;
  }

  /**
   * validates whether you're connected to a group you're trying to connect. (made for OAuth)
   * @param request request object
   * @returns true if validated, throws if otherwise
   */
  async verifyOAuthConnection(request: Request) {
    // parsing
    const parser = new RequestParser(request);
    const identity = parser.identity();

    // if not connecting, let it pass
    if (identity.metadata.action !== "connect") {
      return true;
    }

    // email is required
    if (!identity.email) {
      throw new Error("identity has no email attached.");
    }

    // user by email
    const user = await this.drizzleService.db.query.users.findFirst({
      where: eq(users.email, identity.email),
    });

    if (!user) {
      return true;
    }

    if (!identity.metadata.groupId) {
      throw new Error("groupId is required for the connection mode.");
    }

    // Any connected sessions with that user ID
    const connection = await this.drizzleService.db.query.connections.findFirst({
      where: and(eq(db.connections.group_id, identity.metadata.groupId), eq(db.connections.user_id, user.id)),
    });

    if (connection) {
      throw new Error("session is already connected.");
    }

    return true;
  }

  /**
   * validstea whether you're a member of the group by "connectionId" in your body/query. (have to run after AuthGuards)
   * @param request request object
   * @param type type of the validation
   * @returns true if validated, throws if otherwise
   */
  async verifyConnection(request: Request, type: "membership" | "ownership") {
    // parsing
    const parser = new RequestParser(request);
    const user = parser.user();
    const { connectionId } = parser.body({ connectionId: z.nanoid() });

    // getting the group

    const connection = await this.drizzleService.db.query.connections.findFirst({
      where: eq(db.connections.id, connectionId),
    });

    if (!connection) {
      throw new Error("cannot find group by the connectionId.");
    }

    let validated: db.Connections | db.ConnectionsGroup | undefined;

    switch (type) {
      case "membership": {
        validated = await this.drizzleService.db.query.connections.findFirst({
          where: and(eq(db.connections.group_id, connection.group_id), eq(db.connections.user_id, user.id)),
        });

        break;
      }
      case "ownership": {
        validated = await this.drizzleService.db.query.connections_group.findFirst({
          where: and(eq(db.connections_group.id, connection.group_id), eq(db.connections_group.owner_user_id, user.id)),
        });
        break;
      }
    }

    if (!validated) {
      throw new Error("connection has not been validated.");
    }

    return true;
  }
}
