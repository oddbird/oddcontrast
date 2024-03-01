import { ColorSpace, PlainColorObject } from 'colorjs.io/fn';

declare global {
  interface Window {
    bg?: PlainColorObject;
    fg?: PlainColorObject;
    ColorSpace?: typeof ColorSpace;
  }
}
