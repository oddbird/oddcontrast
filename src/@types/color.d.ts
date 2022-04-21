declare module '$src/vendor/color.esm' {
  export default class Color {
    constructor(spaceId: string, coords: [number, number, number]) {
      this.spaceId = spaceId;
      this.coords = coords;
      this.hsl = coords;
    }

    spaceId: string;
    coords: [number, number, number];
    hsl: [number, number, number];
  }
}
