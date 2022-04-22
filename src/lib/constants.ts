import Color, { type ColorSpace } from '$src/vendor/color.esm';

interface Slider {
  id: string;
  label: string;
  range: [number, number];
  calc?: (input: number) => number;
}
export const SLIDERS: { [key in ColorSpace]: Slider[] } = {
  hsl: [
    { id: 'hue', label: 'Hue', range: Color.spaces['hsl'].coords.hue },
    {
      id: 'saturation',
      label: 'Saturation',
      range: Color.spaces['hsl'].coords.saturation,
    },
    {
      id: 'lightness',
      label: 'Lightness',
      range: Color.spaces['hsl'].coords.lightness,
    },
  ],
  oklch: [
    {
      id: 'lightness',
      label: 'Lightness',
      range: Color.spaces['oklch'].coords.lightness,
    },
    {
      id: 'chroma',
      label: 'Chroma',
      range: Color.spaces['oklch'].coords.chroma,
    },
    { id: 'hue', label: 'Hue', range: Color.spaces['oklch'].coords.hue },
  ],
};

export const SPACES: ColorSpace[] = ['oklch', 'hsl'];
