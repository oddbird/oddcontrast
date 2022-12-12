import {
  ColorSpace,
  HSL,
  Lab,
  LCH,
  OKLCH,
  P3,
  REC_2020,
  sRGB,
} from 'colorjs.io/fn';
import type { ColorObject } from 'colorjs.io/types/src/color';
import { BROWSER, DEV } from 'esm-env';
import { writable } from 'svelte/store';

import type { ColorSpaceId } from '$lib/constants';

// Register supported color spaces
ColorSpace.register(HSL);
ColorSpace.register(OKLCH);

// Register default fallback color spaces
ColorSpace.register(sRGB);
ColorSpace.register(LCH);
ColorSpace.register(Lab);
ColorSpace.register(REC_2020);
ColorSpace.register(P3);

export { ColorSpace };

export const INITIAL_VALUES = {
  space: 'oklch' as ColorSpaceId,
  bg_coord: [0.384, 0.069, 262] as [number, number, number],
  fg_coord: [0.89, 0.035, 238] as [number, number, number],
  alpha: 1,
};

const INITIAL_BG = {
  space: ColorSpace.get(INITIAL_VALUES.space),
  coords: INITIAL_VALUES.bg_coord,
  alpha: INITIAL_VALUES.alpha,
};
const INITIAL_FG = {
  space: ColorSpace.get(INITIAL_VALUES.space),
  coords: INITIAL_VALUES.fg_coord,
  alpha: INITIAL_VALUES.alpha,
};

export const space = writable<ColorSpaceId>(INITIAL_VALUES.space);
export const bg = writable<ColorObject>(INITIAL_BG);
export const fg = writable<ColorObject>(INITIAL_FG);

export const reset = () => {
  bg.set(INITIAL_BG);
  fg.set(INITIAL_FG);
};

/* c8 ignore next 5 */
if (BROWSER && DEV) {
  bg.subscribe(($bg) => (window.bg = $bg));
  fg.subscribe(($fg) => (window.fg = $fg));
  window.ColorSpace = ColorSpace;
}
