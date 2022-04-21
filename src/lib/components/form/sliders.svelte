<script lang="ts">
  import type { Writable } from 'svelte/store';

  import type Color from '$src/vendor/color.esm';

  export let type: 'bg' | 'fg';
  export let color: Writable<Color>;

  const handleSlider = (idx: number) => (e: Event) => {
    $color.hsl[idx] = Number((e.target as HTMLInputElement).value);
  };
</script>

<div data-actions="edit-color" data-group="sliders {type}">
  <div data-field="color-slider">
    <label for="{type}_h" data-label>Hue</label>
    <input
      id="{type}_h"
      name="{type}_h"
      type="range"
      min="0"
      max="360"
      value={$color.hsl[0]}
      on:input={handleSlider(0)}
    />
  </div>
  <div data-field="color-slider">
    <label for="{type}_s" data-label>Saturation</label>
    <input
      id="{type}_s"
      name="{type}_s"
      type="range"
      value={$color.hsl[1]}
      on:input={handleSlider(1)}
    />
  </div>
  <div data-field="color-slider">
    <label for="{type}_l" data-label>Lightness</label>
    <input
      id="{type}_l"
      name="{type}_l"
      type="range"
      value={$color.hsl[2]}
      on:input={handleSlider(2)}
    />
  </div>
</div>

<style lang="scss">
  input[type='range'] {
    margin: 0;
  }
</style>
