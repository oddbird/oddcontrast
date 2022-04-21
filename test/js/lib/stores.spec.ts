import { get } from 'svelte/store';

import { bg, bg_display, fg, fg_display, reset } from '$lib/stores';

describe('bg', () => {
  afterEach(() => {
    reset();
  });

  it('should combine hsl values', () => {
    get(bg).hsl = [1, 2, 3];
    const expected = 'hsl(1 2% 3%)';

    expect(get(bg_display)).toEqual(expected);
  });
});

describe('fg', () => {
  afterEach(() => {
    reset();
  });

  it('should combine hsl values', () => {
    get(fg).hsl = [1, 2, 3];
    const expected = 'hsl(1 2% 3%)';

    expect(get(fg_display)).toEqual(expected);
  });
});
