export type ColorSpaceId = 'hsl' | 'oklch';

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
