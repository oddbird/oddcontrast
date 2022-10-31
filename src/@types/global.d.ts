import { ColorSpace } from 'colorjs.io/fn';
import type { ColorObject } from 'colorjs.io/types/src/color';

declare global {
  interface Window {
    bg?: ColorObject;
    fg?: ColorObject;
    ColorSpace?: typeof ColorSpace;
  }
}
