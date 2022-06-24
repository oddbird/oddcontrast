import Color, { type ColorSpace } from 'colorjs.io';
import { writable } from 'svelte/store';

import { browser, dev } from '$app/env';

export const INITIAL_VALUES = {
  space: 'oklch' as ColorSpace,
  bg_coord: [0.4712, 0.0704, 223.44] as [number, number, number],
  fg_coord: [0.9505, 0.013, 219.61] as [number, number, number],
};

export const space = writable<ColorSpace>(INITIAL_VALUES.space);
export const bg = writable(
  new Color(INITIAL_VALUES.space, INITIAL_VALUES.bg_coord),
);
export const fg = writable(
  new Color(INITIAL_VALUES.space, INITIAL_VALUES.fg_coord),
);

export const reset = () => {
  bg.set(new Color(INITIAL_VALUES.space, INITIAL_VALUES.bg_coord));
  fg.set(new Color(INITIAL_VALUES.space, INITIAL_VALUES.fg_coord));
};

/* c8 ignore next 5 */
if (browser && dev) {
  window.Color = Color;
  bg.subscribe(($bg) => (window.bg = $bg));
  fg.subscribe(($fg) => (window.fg = $fg));
}
