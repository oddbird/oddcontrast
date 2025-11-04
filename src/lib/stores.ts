import {
  ColorSpace,
  HSL,
  Lab,
  LCH,
  OKLab,
  OKLCH,
  P3,
  type PlainColorObject,
  REC_2020,
  sRGB,
} from 'colorjs.io/fn';
import { get, writable } from 'svelte/store';

// eslint-disable-next-line import/no-unresolved
import { browser, dev } from '$app/environment';
import type { ColorFormatId, ColorGamutId } from '$lib/constants';

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
  format: 'p3' as ColorFormatId,
  gamut: null as ColorGamutId,
  bg_coord: [0.0967, 0.167, 0.4494] as [number, number, number],
  fg_coord: [0.951, 0.675, 0.7569] as [number, number, number],
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
export const gamut = writable<ColorGamutId>(INITIAL_VALUES.gamut);
export const bg = writable<PlainColorObject>(INITIAL_BG);
export const fg = writable<PlainColorObject>(INITIAL_FG);

export const reset = () => {
  bg.set(INITIAL_BG);
  fg.set(INITIAL_FG);
};

export const switchColors = () => {
  const temp = get(bg);
  bg.set(get(fg));
  fg.set(temp);
};

/* v8 ignore next 5 -- @preserve */
if (browser && dev) {
  bg.subscribe(($bg) => (window.bg = $bg));
  fg.subscribe(($fg) => (window.fg = $fg));
  window.ColorSpace = ColorSpace;
}
