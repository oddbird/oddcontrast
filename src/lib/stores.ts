import { type Readable, derived, get, writable } from 'svelte/store';

import { browser } from '$app/env';
import Color, { type ColorSpace } from '$src/vendor/color.esm';

export const INITIAL_VALUES = {
  space: 'oklch' as ColorSpace,
  bg_coord: [0.4712, 0.0704, 223.44] as [number, number, number],
  fg_coord: [0.9505, 0.013, 219.61] as [number, number, number],
};

export const bg = writable(
  new Color(INITIAL_VALUES.space, INITIAL_VALUES.bg_coord),
);
export const fg = writable(
  new Color(INITIAL_VALUES.space, INITIAL_VALUES.fg_coord),
);

export const bg_display: Readable<string> = derived([bg], ([$bg]) =>
  $bg.toString(),
);
export const fg_display: Readable<string> = derived([fg], ([$fg]) =>
  $fg.toString(),
);

export const reset = () => {
  bg.set(new Color(INITIAL_VALUES.space, INITIAL_VALUES.bg_coord));
  fg.set(new Color(INITIAL_VALUES.space, INITIAL_VALUES.fg_coord));
};

/* c8 ignore next 5 */
if (browser) {
  window.Color = Color;
  window.bg = get(bg);
  window.fg = get(fg);
}
