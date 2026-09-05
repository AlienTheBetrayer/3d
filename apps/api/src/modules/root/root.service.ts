import { Injectable } from '@nestjs/common';

@Injectable()
export class RootService {
  health() {
    return {
      service: 'Flexbound API',
      status: 'ok',
    };
  }
}
