type ColorSpaceId = 'hsl' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'p3' | 'srgb';

export type ColorFormatId = ColorSpaceId | 'hex';

export const SLIDERS: Record<ColorFormatId, string[]> = {
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

export type ColorGamutId = 'srgb' | 'p3' | 'rec2020' | null;

export const GAMUTS: { name: string; format: ColorGamutId }[] = [
  { name: 'None', format: null },
  { name: 'sRGB', format: 'srgb' },
  { name: 'P3', format: 'p3' },
  { name: 'Rec2020', format: 'rec2020' },
];
export const GAMUT_IDS = GAMUTS.map((gamut) => gamut.format);

export interface FormatGroup {
  name: string;
  formats: ColorFormatId[];
  gamutFormat?: ColorFormatId;
  gamutName?: string;
}

export const FORMAT_GROUPS: FormatGroup[] = [
  {
    name: 'sRGB FORMATS',
    formats: ['hex', 'hsl', 'srgb'],
    gamutFormat: 'srgb',
    gamutName: 'sRGB',
  },
  { name: 'UNBOUNDED SPACES', formats: ['lab', 'lch', 'oklab', 'oklch'] },
  {
    name: 'DISPLAY P3 SPACE',
    formats: ['p3'],
    gamutFormat: 'p3',
    gamutName: 'P3',
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
