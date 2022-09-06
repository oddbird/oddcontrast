import { ColorObject, ColorSpace } from 'colorjs.io/fn';

declare global {
  interface Window {
    bg?: ColorObject;
    fg?: ColorObject;
    ColorSpace?: typeof ColorSpace;
  }
}
