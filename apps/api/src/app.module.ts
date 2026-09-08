import { Module } from '@nestjs/common';
import { RootModule } from './modules/root/root.module.js';
import { AppConfigModule } from './modules/config/config.module.js';
import { DrizzleModule } from './modules/drizzle/drizzle.module.js';

const imports = [RootModule, AppConfigModule, DrizzleModule];

@Module({
  imports,
})
export class AppModule {}
