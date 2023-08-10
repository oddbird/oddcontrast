import { clone, ColorSpace, display, parse, set, steps } from 'colorjs.io/fn';
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

  function decodeColor(colorHash: string) {
    colorHash = colorHash.replaceAll('_', ' ');
    colorHash = colorHash.replaceAll('~', '%');
    try {
      return parse(colorHash);
    } catch (error) {
      return;
    }
  }

  const bgColor = decodeColor(bgValue);
  if (!bgColor) return;
  const fgColor = decodeColor(fgValue);
  if (!fgColor) return;

  if (!FORMATS.includes(formatValue as ColorFormatId)) return;
  const format = formatValue as ColorFormatId;

  const bg = {
    space: ColorSpace.get(bgColor.spaceId),
    coords: bgColor.coords,
    alpha: bgColor.alpha || 1,
  };
  const fg = {
    space: ColorSpace.get(fgColor.spaceId),
    coords: fgColor.coords,
    alpha: fgColor.alpha || 1,
  };

  return { bg, fg, format };
};

export const storeValuesToHash = (
  bg: PlainColorObject,
  fg: PlainColorObject,
  format: ColorFormatId,
) => {
  function encodeColor(color: PlainColorObject) {
    let res = serialize(color, { format, inGamut: false }) || '';
    res = res.replaceAll(' ', '_');
    res = res.replaceAll('%', '~');
    return res;
  }
  const bgParam = encodeColor(bg);
  const fgParam = encodeColor(fg);
  return encodeURIComponent(`${format}__${bgParam}__${fgParam}`);
};
