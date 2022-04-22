declare module '$src/vendor/color.esm' {
  export type ColorSpace = 'hsl' | 'oklch';

  export default class Color {
    constructor(
      public spaceId: ColorSpace,
      public coords: [number, number, number],
    ) {}

    static spaces: {
      [key in ColorSpace]: {
        id: ColorSpace;
        name: string;
        coords: { [key: string]: [number, number] };
      };
    };
  }
}
