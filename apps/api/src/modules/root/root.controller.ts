import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service.js';

@Controller()
export class RootController {
  constructor(private readonly rootService: RootService) {}

  @Get()
  health() {
    return this.rootService.health();
  }
}
