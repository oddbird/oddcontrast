import { type PlainColorObject, serialize } from 'colorjs.io/fn';

import { ColorSpace } from '$lib/stores';

export const HSL = ColorSpace.get('hsl');

export const HSL_WHITE: PlainColorObject = {
  space: HSL,
  coords: HSL.white,
  alpha: 1,
};

export const HSL_BLACK: PlainColorObject = {
  space: HSL,
  coords: [0, 0, 0],
  alpha: 1,
};

export const HSL_WHITE_SERIALIZED = serialize(HSL_WHITE, { inGamut: false });

export const OUT_OF_BOUNDED_GAMUTS: PlainColorObject = {
  space: ColorSpace.get('oklch'),
  coords: [1, 1, 1],
  alpha: 1,
};
