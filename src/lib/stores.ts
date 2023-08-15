import {
  ColorSpace,
  HSL,
  Lab,
  LCH,
  OKLab,
  OKLCH,
  P3,
  REC_2020,
  sRGB,
} from 'colorjs.io/fn';
import type { PlainColorObject } from 'colorjs.io/types/src/color';
import { derived, writable } from 'svelte/store';

// eslint-disable-next-line import/no-unresolved
import { browser, dev } from '$app/environment';
import type { ColorFormatId } from '$lib/constants';

import { premultiplyFG } from './utils';

// Register supported color spaces
ColorSpace.register(HSL);
ColorSpace.register(Lab);
ColorSpace.register(LCH);
ColorSpace.register(OKLab);
ColorSpace.register(OKLCH);
ColorSpace.register(P3);
ColorSpace.register(sRGB);

// Register necessary default fallback color space
ColorSpace.register(REC_2020);

export { ColorSpace };

export const INITIAL_VALUES = {
  format: 'oklch' as ColorFormatId,
  bg_coord: [0.3259, 0.1333, 265.49] as [number, number, number],
  fg_coord: [0.8241, 0.1061, 0.8587] as [number, number, number],
  alpha: 1,
};

const INITIAL_BG = {
  space: ColorSpace.get(INITIAL_VALUES.format),
  coords: INITIAL_VALUES.bg_coord,
  alpha: INITIAL_VALUES.alpha,
};
const INITIAL_FG = {
  space: ColorSpace.get(INITIAL_VALUES.format),
  coords: INITIAL_VALUES.fg_coord,
  alpha: INITIAL_VALUES.alpha,
};

export const format = writable<ColorFormatId>(INITIAL_VALUES.format);
export const bg = writable<PlainColorObject>(INITIAL_BG);
export const fg = writable<PlainColorObject>(INITIAL_FG);
export const premultipliedFg = derived([fg, bg, format], premultiplyFG);

export const reset = () => {
  bg.set(INITIAL_BG);
  fg.set(INITIAL_FG);
};

/* c8 ignore next 5 */
if (browser && dev) {
  bg.subscribe(($bg) => (window.bg = $bg));
  fg.subscribe(($fg) => (window.fg = $fg));
  window.ColorSpace = ColorSpace;
}
