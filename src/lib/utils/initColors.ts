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

// Register supported color spaces
ColorSpace.register(HSL);
ColorSpace.register(OKLCH);

// Register default fallback color spaces
ColorSpace.register(sRGB);
ColorSpace.register(LCH);
ColorSpace.register(Lab);
ColorSpace.register(REC_2020);
ColorSpace.register(P3);
