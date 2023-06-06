import { serialize } from 'colorjs.io/fn';
import type { PlainColorObject } from 'colorjs.io/types/src/color';

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
