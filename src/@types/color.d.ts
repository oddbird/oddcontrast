/* eslint-disable @typescript-eslint/no-unused-vars */

declare module 'colorjs.io/fn' {
  export type ColorSpaceId = 'hsl' | 'oklch';

  export interface ColorSpaceObject {
    id: ColorSpaceId;
    name: string;
    coords: {
      [key: string]: {
        name: string;
        range?: [number, number];
        refRange?: [number, number];
      };
    };
    white: [number, number, number];
  }

  export interface ColorObject {
    space: ColorSpaceObject;
    coords: [number, number, number];
    alpha?: number;
  }

  export interface ColorString extends String {
    color: ColorObject;
  }

  function get(space: ColorSpaceId): ColorSpaceObject;
  function register(space: ColorSpaceObject): ColorSpaceObject;
  function resolveCoord({ space: ColorSpaceObject, coordId: string }): {
    space: ColorSpaceObject;
    coord: string;
    index: number;
  };

  export const ColorSpace = {
    get,
    register,
    resolveCoord,
  };

  export function to(
    color: ColorObject | string,
    space: ColorSpaceId,
    { inGamut }: { inGamut?: boolean } = {},
  ): ColorObject;

  export function display(
    color: ColorObject,
    { inGamut }: { inGamut?: boolean } = {},
  ): ColorString;

  export function serialize(
    color: ColorObject,
    { inGamut }: { inGamut?: boolean } = {},
  ): string;

  export function inGamut(color: ColorObject): boolean;

  export function contrast(
    background: ColorObject,
    foreground: ColorObject,
    algorithm: string,
  ): number;

  export const HSL = ColorSpaceObject;
  export const Lab = ColorSpaceObject;
  export const LCH = ColorSpaceObject;
  export const OKLCH = ColorSpaceObject;
  export const P3 = ColorSpaceObject;
  export const REC_2020 = ColorSpaceObject;
  export const sRGB = ColorSpaceObject;
}
