declare module 'colorjs.io' {
  type ColorSpace = 'hsl' | 'oklch';

  interface ToStringOpts {
    precision?: number;
    commas?: boolean;
    inGamut?: boolean;
    fallback?: boolean;
  }

  interface ColorString extends String {
    color: Color;
  }

  export default class Color {
    constructor(
      spaceId: ColorSpace | ColorString | string,
      coords?: [number, number, number],
    ) {
      if (coords) {
        this.spaceId = spaceId as ColorSpace;
        this.coords = coords;
      }
    }

    static spaces: {
      [key in ColorSpace]: {
        id: ColorSpace;
        name: string;
        coords: {
          [key: string]: {
            name: string;
            range?: [number, number];
            refRange?: [number, number];
          };
        };
      };
    };

    spaceId: ColorSpace;
    coords: [number, number, number];
    to: (s: ColorSpace, { inGamut }: { inGamut?: boolean } = {}) => Color;
    inGamut: (s: ColorSpace = this.spaceId) => boolean;
    toString: (opts: ToStringOpts = {}) => ColorString | string;

    [key: string]: {
      [key: string]: number;
    };
  }
}
