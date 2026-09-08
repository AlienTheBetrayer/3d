import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@repo/db/schema';
import { AppConfigService } from '../config/config.service.js';

@Injectable()
export class DrizzleService implements OnModuleDestroy {
  private readonly pool: Pool;
  readonly db: NodePgDatabase<typeof schema>;

  constructor(private readonly configService: AppConfigService) {
    this.pool = new Pool({
      connectionString: this.configService.get('DATABASE_URL'),
    });
    this.db = drizzle({ client: this.pool, schema, casing: 'snake_case' });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
