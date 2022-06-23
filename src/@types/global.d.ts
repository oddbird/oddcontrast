import Color from 'colorjs.io';

declare global {
  interface Window {
    Color: typeof Color;
    bg: Color;
    fg: Color;
  }
}
