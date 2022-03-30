import { get } from 'svelte/store';

import { bg, bg_h, bg_l, bg_s, fg, fg_h, fg_l, fg_s, reset } from '$lib/stores';

describe('bg', () => {
  afterEach(() => {
    reset();
  });

  it('should combine hsl values', () => {
    bg_h.set(1);
    bg_s.set(2);
    bg_l.set(3);
    const expected = 'hsl(1deg 2% 3%)';

    expect(get(bg)).toEqual(expected);
  });
});

describe('fg', () => {
  afterEach(() => {
    reset();
  });

  it('should combine hsl values', () => {
    fg_h.set(1);
    fg_s.set(2);
    fg_l.set(3);
    const expected = 'hsl(1deg 2% 3%)';

    expect(get(fg)).toEqual(expected);
  });
});
