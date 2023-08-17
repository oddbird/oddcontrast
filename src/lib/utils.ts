import { clone, display, mix, serialize, set, steps, to } from 'colorjs.io/fn';
import type { PlainColorObject } from 'colorjs.io/types/src/color';

import type { ColorFormatId } from '$lib/constants';
import { FORMATS } from '$lib/constants';

export const getSpaceFromFormatId = (formatId: ColorFormatId) =>
  formatId === 'hex' ? 'srgb' : formatId;

export const sliderGradient = (
  color: PlainColorObject,
  channel: string,
  range: [number, number],
) => {
  const start = clone(color);
  const end = clone(color);
  if (channel === 'alpha') {
    start.alpha = range[0];
    end.alpha = range[1];
  } else {
    set(start, channel, range[0]);
    set(end, channel, range[1]);
  }

  const gradientSteps = steps(start, end, {
    steps: 10,
    space: color.space,
    hue: 'raw',
  });

  return gradientSteps.map((c) => display(c)).join(', ');
};

function decodeColor(colorHash: string, format: ColorFormatId) {
  colorHash = colorHash.replaceAll('_', ' ');
  colorHash = colorHash.replaceAll('~', '%');
  colorHash = colorHash.replaceAll('*', '#');
  try {
    return to(colorHash, getSpaceFromFormatId(format), { inGamut: true });
  } catch (error) {
    console.error(error);
    return;
  }
}

function encodeColor(color: PlainColorObject, format: ColorFormatId) {
  let res = serialize(color, { format, inGamut: false });
  res = res.replaceAll(' ', '_');
  res = res.replaceAll('%', '~');
  res = res.replaceAll('#', '*');
  return res;
}

export const hashToStoreValues = (
  hash: string,
): {
  bg: PlainColorObject;
  fg: PlainColorObject;
  format: ColorFormatId;
} | void => {
  if (hash === '') return;
  hash = decodeURIComponent(hash);

  const [formatValue, bgValue, fgValue] = hash.split('__') as [
    string,
    string,
    string,
  ];
  if (!bgValue || !fgValue) return;

  if (!FORMATS.includes(formatValue as ColorFormatId)) return;
  const format = formatValue as ColorFormatId;

  const bg = decodeColor(bgValue, format);
  if (!bg) return;
  const fg = decodeColor(fgValue, format);
  if (!fg) return;

  return { bg, fg, format };
};

export const storeValuesToHash = (
  bg: PlainColorObject,
  fg: PlainColorObject,
  format: ColorFormatId,
) => {
  const bgParam = encodeColor(bg, format);
  const fgParam = encodeColor(fg, format);
  return encodeURIComponent(`${format}__${bgParam}__${fgParam}`);
};

export const premultiplyFG = ([fg, bg, format]: [
  fg: PlainColorObject,
  bg: PlainColorObject,
  format: ColorFormatId,
]) => {
  const bgNoAlpha = clone(bg);
  bgNoAlpha.alpha = 1;
  const fgNoAlpha = clone(fg);
  fgNoAlpha.alpha = 1;

  return mix(fgNoAlpha, bgNoAlpha, 1 - fg.alpha, {
    // We always mix in srgb, as we are approximating the color as it will be
    // displayed on a monitor.
    space: 'srgb',
    outputSpace: getSpaceFromFormatId(format),
  });
};
