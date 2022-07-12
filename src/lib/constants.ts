import type { ColorSpace } from 'colorjs.io';

export const SLIDERS: { [key in ColorSpace]: string[] } = {
  hsl: ['h', 's', 'l'],
  oklch: ['l', 'c', 'h'],
};

export const SPACES: ColorSpace[] = ['oklch', 'hsl'];
