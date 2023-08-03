import { clone, display, set, steps } from 'colorjs.io/fn';
import type { PlainColorObject } from 'colorjs.io/types/src/color';

import type { ColorFormatId } from '$lib/constants';

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
