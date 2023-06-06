import { get } from 'svelte/store';

import { bg, fg, INITIAL_VALUES, reset } from '$lib/stores';
import { HSL_WHITE } from '$test/fixtures';

describe('reset', () => {
  it('resets to initial values', () => {
    bg.set(HSL_WHITE);
    fg.set(HSL_WHITE);
    reset();

    expect(get(fg).space.id).toEqual(INITIAL_VALUES.space);
    expect(get(bg).space.id).toEqual(INITIAL_VALUES.space);
  });
});
