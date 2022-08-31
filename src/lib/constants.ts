import type { ColorSpaceId } from 'colorjs.io/fn';

export const SLIDERS: { [key in ColorSpaceId]: string[] } = {
  hsl: ['h', 's', 'l'],
  oklch: ['l', 'c', 'h'],
};

export const SPACES: ColorSpaceId[] = ['oklch', 'hsl'];

export const RATIOS = {
  AA: {
    Normal: 4.5,
    Large: 3,
  },
  AAA: {
    Normal: 7,
    Large: 4.5,
  },
};
