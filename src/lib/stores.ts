import { derived, writable } from 'svelte/store';

export const bg_h = writable(195);
export const bg_s = writable(52);
export const bg_l = writable(31);
export const fg_h = writable(195);
export const fg_s = writable(42);
export const fg_l = writable(93);

export const bg = derived(
  [bg_h, bg_s, bg_l],
  ([$bg_h, $bg_s, $bg_l]) => `hsl(${$bg_h}deg ${$bg_s}% ${$bg_l}%)`,
);
export const fg = derived(
  [fg_h, fg_s, fg_l],
  ([$fg_h, $fg_s, $fg_l]) => `hsl(${$fg_h}deg ${$fg_s}% ${$fg_l}%)`,
);
