type ColorSpaceId = 'hsl' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'p3' | 'srgb';

export type ColorFormatId = ColorSpaceId | 'hex';

export const SLIDERS: { [key in ColorFormatId]: string[] } = {
  hex: ['r', 'g', 'b'],
  hsl: ['h', 's', 'l'],
  lab: ['l', 'a', 'b'],
  lch: ['l', 'c', 'h'],
  oklab: ['l', 'a', 'b'],
  oklch: ['l', 'c', 'h'],
  p3: ['r', 'g', 'b'],
  srgb: ['r', 'g', 'b'],
};

export const FORMATS: ColorFormatId[] = [
  'hex',
  'hsl',
  'lab',
  'lch',
  'oklab',
  'oklch',
  'p3',
  'srgb',
];

export type FormatGroup = {
  name: string;
  formats: ColorFormatId[];
  gamutFormat?: ColorFormatId;
  gamutName?: string;
};

export const FORMAT_GROUPS: FormatGroup[] = [
  {
    name: 'sRGB Formats',
    formats: ['hex', 'hsl', 'srgb'],
    gamutFormat: 'srgb',
    gamutName: 'sRGB',
  },
  { name: 'Unbounded Spaces', formats: ['lab', 'lch', 'oklab', 'oklch'] },
  {
    name: 'Display p3 Space',
    formats: ['p3'],
    gamutFormat: 'p3',
    gamutName: 'p3',
  },
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
    name: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/company/oddbird',
  },
  {
    name: 'Mastodon',
    icon: 'mastodon',
    href: 'https://front-end.social/@OddBird',
  },
];
