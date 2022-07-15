import type { ColorSpaceId } from 'colorjs.io/fn';

export const SLIDERS: { [key in ColorSpaceId]: string[] } = {
  hsl: ['h', 's', 'l'],
  oklch: ['l', 'c', 'h'],
};

export const SPACES: ColorSpaceId[] = ['oklch', 'hsl'];
