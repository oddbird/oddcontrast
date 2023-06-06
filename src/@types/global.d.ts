import { ColorSpace } from 'colorjs.io/fn';
import type { PlainColorObject } from 'colorjs.io/types/src/color';

declare global {
  interface Window {
    bg?: PlainColorObject;
    fg?: PlainColorObject;
    ColorSpace?: typeof ColorSpace;
  }
}
