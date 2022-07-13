import { ColorSpace, serialize } from 'colorjs.io/fn';

export const HSL = ColorSpace.get('hsl');

export const HSL_WHITE = {
  space: HSL,
  coords: HSL.white,
};

export const HSL_WHITE_SERIALIZED = serialize(HSL_WHITE, { inGamut: false });
