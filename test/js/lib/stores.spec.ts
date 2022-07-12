import { get } from 'svelte/store';

import { bg, fg, INITIAL_VALUES, reset } from '$lib/stores';

describe('bg', () => {
  afterEach(() => {
    reset();
  });

  it('should combine coordinates', () => {
    bg.set(get(bg).to('hsl'));
    get(bg).setAll('hsl', [1, 2, 3]);
    const expected = 'hsl(1 2% 3%)';

    expect(get(bg).toString()).toEqual(expected);
  });
});

describe('fg', () => {
  afterEach(() => {
    reset();
  });

  it('should combine coordinates', () => {
    fg.set(get(fg).to('hsl'));
    get(fg).setAll('hsl', [1, 2, 3]);
    const expected = 'hsl(1 2% 3%)';

    expect(get(fg).toString()).toEqual(expected);
  });
});

describe('reset', () => {
  it('resets to initial values', () => {
    bg.set(get(bg).to('hsl'));
    get(bg).setAll('hsl', [1, 2, 3]);
    fg.set(get(fg).to('hsl'));
    get(fg).setAll('hsl', [4, 5, 6]);
    reset();

    expect(get(fg).spaceId).toEqual(INITIAL_VALUES.space);
    expect(get(bg).spaceId).toEqual(INITIAL_VALUES.space);
  });
});
