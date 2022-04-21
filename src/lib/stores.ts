import { type Readable, derived, writable } from 'svelte/store';

import { browser } from '$app/env';
import Color from '$src/vendor/color.esm';

const INITIAL_VALUES = {
  bg_space: 'hsl',
  bg_coord: [195, 52, 31] as [number, number, number],
  fg_space: 'hsl',
  fg_coord: [195, 42, 93] as [number, number, number],
};

export const bg = writable(
  new Color(INITIAL_VALUES.bg_space, INITIAL_VALUES.bg_coord),
);
export const fg = writable(
  new Color(INITIAL_VALUES.fg_space, INITIAL_VALUES.fg_coord),
);

export const bg_display: Readable<string> = derived([bg], ([$bg]) =>
  $bg.toString(),
);
export const fg_display: Readable<string> = derived([fg], ([$fg]) =>
  $fg.toString(),
);

export const reset = () => {
  bg.set(new Color(INITIAL_VALUES.bg_space, INITIAL_VALUES.bg_coord));
  fg.set(new Color(INITIAL_VALUES.fg_space, INITIAL_VALUES.fg_coord));
};

/* c8 ignore next 3 */
if (browser) {
  window.Color = Color;
}
