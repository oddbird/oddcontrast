<script lang="ts">
  import type { Writable } from 'svelte/store';

  export let type: 'bg' | 'fg';
  export let h: Writable<number>;
  export let s: Writable<number>;
  export let l: Writable<number>;
</script>

<div data-actions="edit-color" data-group="sliders {type}">
  <div data-field="color-slider">
    <label for="{type}_h" data-label>Hue</label>
    <input name="{type}_h" type="range" bind:value={$h} min="0" max="360" />
  </div>
  <div data-field="color-slider">
    <label for="{type}_s" data-label>Saturation</label>
    <input name="{type}_s" type="range" bind:value={$s} />
  </div>
  <div data-field="color-slider">
    <label for="{type}_l" data-label>Lightness</label>
    <input name="{type}_l" type="range" bind:value={$l} />
  </div>
</div>

<style lang="scss" scoped>
  input[type='range'] {
    margin: 0;
  }
</style>
