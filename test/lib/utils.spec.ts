// Color spaces setup happens in stores, imported here as side effect
import '$lib/stores';

import { type PlainColorObject, serialize, to } from 'colorjs.io/fn';

import type { ColorFormatId } from '$lib/constants';
import {
  getSpaceFromFormatId,
  hashToStoreValues,
  storeValuesToHash,
} from '$lib/utils';

const cases = [
  [
    'valid p3',
    'p3__color(display-p3_1_1_1)__color(display-p3_0.1_0.1_0.1)',
    'color(display-p3 1 1 1)',
    'color(display-p3 0.1 0.1 0.1)',
    'p3',
  ],
  [
    'valid hex',
    'hex__*132b77__*4a0022',
    'rgb(7.451% 16.863% 46.667%)',
    'rgb(29.02% 0% 13.333%)',
    'hex',
  ],
  [
    'oklab with percents',
    'oklab__oklab(73.4~_0.177_0.107)__oklab(73.3~_0.102_0.0016)',
    'oklab(73.4% 0.177 0.107)',
    'oklab(73.3% 0.102 0.0016)',
    'oklab',
  ],
  [
    'oklab with negative values',
    'oklab__oklab(73.4~_-0.215_-0.215)__oklab(73.3~_-0.298_-0.317)',
    'oklab(73.4% -0.215 -0.215)',
    'oklab(73.3% -0.298 -0.317)',
    'oklab',
  ],
];
describe('Utils', () => {
  describe('hashToStoreValues', () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      vi.spyOn(console, 'error').mockImplementation(() => {});
    });
    test.each([
      ['empty', ''],
      ['missing colors', 'lab'],
      ['missing fg', 'lab__lab(20.069_15.532_-47.05)__'],
      [
        'unknown space',
        'xyz__color(xyz-d50_0.2_0.1_0.4)__color(xyz-d50_0.2_0.1_0.4)',
      ],
      ['invalid bg', 'lab__lab(invalid)__lab(13.296_34.096_1.1789)'],
      ['invalid fg', 'lab__lab(13.296_34.096_1.1789)__lab(invalid)'],
    ])('%s: %s returns undefined', (_, input) => {
      expect(hashToStoreValues(input)).toBeUndefined();
    });
    test.each(cases)(
      '%s: %s returns values',
      (_, input, bgExpected, fgExpected, formatExpected) => {
        const { bg, fg, format } = hashToStoreValues(input) as {
          bg: PlainColorObject;
          fg: PlainColorObject;
          format: ColorFormatId;
        };
        expect(format).toBe(formatExpected);
        expect(serialize(bg)).toBe(bgExpected);
        expect(serialize(fg)).toBe(fgExpected);
      },
    );
  });
  describe('storeValuesToHash', () => {
    test.each(cases)(
      '%s: returns %s',
      (_, output, bgInput, fgInput, format) => {
        const space = getSpaceFromFormatId(format as ColorFormatId);
        const bg = to(bgInput, space);
        const fg = to(fgInput, space);
        const res = storeValuesToHash(bg, fg, format as ColorFormatId);
        expect(res).toBe(output);
      },
    );
  });
});
