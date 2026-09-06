import { describe, expect, it } from 'vitest';

describe('web Vitest setup', () => {
  it('runs with a DOM environment', () => {
    const element = document.createElement('div');
    element.textContent = 'Vitest works';

    expect(element.textContent).toBe('Vitest works');
  });
});
