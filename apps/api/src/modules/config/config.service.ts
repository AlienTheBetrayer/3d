import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from './config.types.js';

@Injectable()
export class AppConfigService {
  constructor(private readonly config: ConfigService<EnvSchema, true>) {}

  /**
   * type-safe "process.env" alternative
   * @param key environmental key
   * @returns .env variable value
   */
  get<K extends keyof EnvSchema>(key: K) {
    return this.config.get(key, { infer: true });
  }
}
