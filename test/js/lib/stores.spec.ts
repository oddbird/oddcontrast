import { get } from 'svelte/store';

import { bg, fg, INITIAL_VALUES, reset } from '$lib/stores';

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

describe('reset', () => {
  it('resets to initial values', () => {
    const $fg = get(fg);
    const $bg = get(bg);
    $fg.spaceId = 'hsl';
    $fg.coords = [1, 2, 3];
    $bg.spaceId = 'hsl';
    $bg.coords = [4, 5, 6];
    reset();

    expect(get(fg).spaceId).toEqual(INITIAL_VALUES.space);
    expect(get(bg).spaceId).toEqual(INITIAL_VALUES.space);
  });
});
