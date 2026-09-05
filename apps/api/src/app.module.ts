import { Module } from '@nestjs/common';
import { RootModule } from './modules/root/root.module.js';
import { AppConfigModule } from './modules/config/config.module.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';

const imports = [RootModule, AppConfigModule, PrismaModule];

@Module({
  imports,
})
export class AppModule {}
