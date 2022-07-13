import { ColorObject } from 'colorjs.io/fn';

declare global {
  interface Window {
    bg?: ColorObject;
    fg?: ColorObject;
  }
}
