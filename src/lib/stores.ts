import type { ColorSpaceId } from 'colorjs.io/fn';
import { ColorSpace } from 'colorjs.io/fn';
import { writable } from 'svelte/store';

// eslint-disable-next-line import/no-unresolved
import { browser, dev } from '$app/environment';

export const INITIAL_VALUES = {
  space: 'oklch' as ColorSpaceId,
  bg_coord: [0.4712, 0.0704, 223.44] as [number, number, number],
  fg_coord: [0.9505, 0.013, 219.61] as [number, number, number],
};

const INITIAL_BG = {
  space: ColorSpace.get(INITIAL_VALUES.space),
  coords: INITIAL_VALUES.bg_coord,
};
const INITIAL_FG = {
  space: ColorSpace.get(INITIAL_VALUES.space),
  coords: INITIAL_VALUES.fg_coord,
};

export const space = writable<ColorSpaceId>(INITIAL_VALUES.space);
export const bg = writable(INITIAL_BG);
export const fg = writable(INITIAL_FG);

export const reset = () => {
  bg.set(INITIAL_BG);
  fg.set(INITIAL_FG);
};

/* c8 ignore next 4 */
if (browser && dev) {
  bg.subscribe(($bg) => (window.bg = $bg));
  fg.subscribe(($fg) => (window.fg = $fg));
}
