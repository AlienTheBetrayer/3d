import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/config.module.js';
import { RootController } from './root.controller.js';
import { RootService } from './root.service.js';

@Module({
  controllers: [RootController],
  providers: [RootService],
  imports: [AppConfigModule],
})
export class RootModule {}
