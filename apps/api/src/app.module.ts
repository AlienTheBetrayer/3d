import { Module } from '@nestjs/common';
import { RootModule } from './modules/root/root.module.js';
import { AppConfigModule } from './modules/config/config.module.js';

const imports = [RootModule, AppConfigModule];

@Module({
  imports,
})
export class AppModule {}
