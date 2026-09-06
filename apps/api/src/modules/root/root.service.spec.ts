import { describe } from 'vitest';
import { expect, it } from 'vitest';
import { RootService } from './root.service.js';

//testing suit
describe('testing root health', () => {
  //testing case 1
  it('should return ok', () => {
    const rootService = new RootService();
    const result = rootService.health();
    expect(result).toEqual({
      service: 'Flexbound API',
      status: 'ok',
    });
  });
});
