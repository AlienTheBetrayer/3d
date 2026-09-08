import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service.js';
import { DrizzleService } from '../drizzle/drizzle.service.js';

@Controller()
export class RootController {
  constructor(
    private readonly rootService: RootService,
    private readonly drizzleService: DrizzleService,
  ) {}

  @Get()
  async health() {
    return this.rootService.health();
  }
}
