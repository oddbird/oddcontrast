export type ColorSpaceId =
  | 'hsl'
  | 'oklch'
  | 'oklab'
  | 'p3'
  | 'lab'
  | 'lch'
  | 'srgb';

export const SLIDERS: { [key in ColorSpaceId]: string[] } = {
  hsl: ['h', 's', 'l'],
  oklch: ['l', 'c', 'h'],
  oklab: ['l', 'a', 'b'],
  p3: ['r', 'g', 'b'],
  lab: ['l', 'a', 'b'],
  lch: ['l', 'c', 'h'],
  srgb: ['r', 'g', 'b'],
};

export const SPACES: ColorSpaceId[] = [
  'hsl',
  'oklch',
  'oklab',
  'p3',
  'lab',
  'lch',
  'srgb',
];

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

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: 'github',
    href: 'https://github.com/oddbird/oddcontrast',
  },
  { name: 'OddBird', icon: 'oddbird', href: 'https://www.oddbird.net/' },
  { name: 'Twitter', icon: 'twitter', href: 'https://twitter.com/oddbird' },
  {
    name: 'Mastodon',
    icon: 'mastodon',
    href: 'https://front-end.social/@OddBird',
  },
];
