import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Controller()
export class RootController {
  constructor(
    private readonly rootService: RootService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  async health() {
    await this.prismaService.test.create({ data: { text: Math.random().toString() } });
    return this.rootService.health();
  }
}
