import { get } from 'svelte/store';

import { bg, fg, reset } from '$lib/stores';

describe('bg', () => {
  afterEach(() => {
    reset();
  });

  it('should combine coordinates', () => {
    const color = get(bg);
    color.spaceId = 'hsl';
    color.coords = [1, 2, 3];
    const expected = 'hsl(1 2% 3%)';

    expect(get(bg).toString()).toEqual(expected);
  });
});

describe('fg', () => {
  afterEach(() => {
    reset();
  });

  it('should combine coordinates', () => {
    const color = get(fg);
    color.spaceId = 'hsl';
    color.coords = [1, 2, 3];
    const expected = 'hsl(1 2% 3%)';

    expect(get(fg).toString()).toEqual(expected);
  });
});
