import { Global, Module } from "@nestjs/common";

import { ConnectionGroupsController } from "./connection-groups.controller.js";
import { ConnectionsCoreService } from "./connections-core.service.js";
import { ConnectionsController } from "./connections.controller.js";
import { ConnectionsService } from "./connections.service.js";

@Global()
@Module({
  controllers: [ConnectionsController, ConnectionGroupsController],
  providers: [ConnectionsService, ConnectionsCoreService],
  exports: [ConnectionsService, ConnectionsCoreService],
})
export class ConnectionsModule {}
