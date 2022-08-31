import type { ColorObject } from 'colorjs.io/fn';
import { ColorSpace, serialize } from 'colorjs.io/fn';

export const HSL = ColorSpace.get('hsl');

export const HSL_WHITE: ColorObject = {
  space: HSL,
  coords: HSL.white,
};

export const HSL_BLACK: ColorObject = {
  space: HSL,
  coords: [0, 0, 0],
};

export const HSL_WHITE_SERIALIZED = serialize(HSL_WHITE, { inGamut: false });
