import { derived, writable } from 'svelte/store';

const INITIAL_VALUES = {
  bg_h: 195,
  bg_s: 52,
  bg_l: 31,
  fg_h: 195,
  fg_s: 42,
  fg_l: 93,
};

export const bg_h = writable(INITIAL_VALUES.bg_h);
export const bg_s = writable(INITIAL_VALUES.bg_s);
export const bg_l = writable(INITIAL_VALUES.bg_l);
export const fg_h = writable(INITIAL_VALUES.fg_h);
export const fg_s = writable(INITIAL_VALUES.fg_s);
export const fg_l = writable(INITIAL_VALUES.fg_l);

export const bg = derived(
  [bg_h, bg_s, bg_l],
  ([$bg_h, $bg_s, $bg_l]) => `hsl(${$bg_h}deg ${$bg_s}% ${$bg_l}%)`,
);
export const fg = derived(
  [fg_h, fg_s, fg_l],
  ([$fg_h, $fg_s, $fg_l]) => `hsl(${$fg_h}deg ${$fg_s}% ${$fg_l}%)`,
);

export const reset = () => {
  bg_h.set(INITIAL_VALUES.bg_h);
  bg_s.set(INITIAL_VALUES.bg_s);
  bg_l.set(INITIAL_VALUES.bg_l);
  fg_h.set(INITIAL_VALUES.fg_h);
  fg_s.set(INITIAL_VALUES.fg_s);
  fg_l.set(INITIAL_VALUES.fg_l);
};
