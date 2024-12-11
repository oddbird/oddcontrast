import {
  clone,
  display,
  inGamut,
  type PlainColorObject,
  serialize,
  set,
  steps,
  to,
} from 'colorjs.io/fn';

import { type ColorFormatId, type ColorGamutId, FORMATS } from '$lib/constants';

export const getSpaceFromFormatId = (formatId: ColorFormatId) =>
  formatId === 'hex' ? 'srgb' : formatId;

export const sliderGradient = ({
  color,
  channel,
  range,
  gamut,
}: {
  color: PlainColorObject;
  channel: string;
  range: [number, number];
  gamut: ColorGamutId;
}) => {
  const start = clone(color);
  const end = clone(color);
  if (channel === 'alpha') {
    start.alpha = 0;
    end.alpha = 1;
  } else {
    set(start, channel, range[0]);
    start.alpha = 1;
    set(end, channel, range[1]);
    end.alpha = 1;
  }

  const gradientSteps = steps(start, end, {
    steps: 10,
    space: color.space,
    hue: 'raw',
    maxDeltaE: 10,
  });
  let wasInGamut: boolean;
  const inGamutSteps: string[] = [];
  const stepWidth = 100 / (gradientSteps.length - 1);

  if (channel === 'alpha' || gamut === null) {
    return gradientSteps.map((c) => display(c)).join(', ');
  }

  gradientSteps.forEach((step, index) => {
    if (inGamut(step, gamut)) {
      if (wasInGamut === false) {
        inGamutSteps.push(`transparent ${stepWidth * (index + 1)}%`);
      }
      wasInGamut = true;
      inGamutSteps.push(`${display(step)} ${stepWidth * index}%`);
    } else {
      if (wasInGamut === true) {
        inGamutSteps.push(`transparent ${stepWidth * (index - 1)}%`);
      }
      inGamutSteps.push(`transparent ${stepWidth * index}%`);

      wasInGamut = false;
    }
  });

  return inGamutSteps.join(', ');
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
