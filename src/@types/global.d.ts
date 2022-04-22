import Color from '$src/vendor/color.esm';

declare global {
  interface Window {
    Color: typeof Color;
    bg: Color;
    fg: Color;
  }
}
