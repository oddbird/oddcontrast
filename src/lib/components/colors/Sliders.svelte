<script lang="ts">
  import type Color from 'colorjs.io';
  import type { ColorSpace } from 'colorjs.io';
  import type { Writable } from 'svelte/store';

  import { SLIDERS } from '$lib/constants';

  export let type: 'bg' | 'fg';
  export let color: Writable<Color>;

  $: space = $color.spaceId as ColorSpace;

  const getStep = (range: [number, number]) => {
    const diff = range[1] - range[0];
    if (diff <= 10) {
      return 0.01;
    } else if (diff < 100) {
      return 0.1;
    } else {
      return 1;
    }
  };
</script>

<div data-actions="edit-color" data-group="sliders {type}">
  <form>
    {#each SLIDERS[space] as slider}
      <div data-field="color-slider">
        <label for="{type}_{slider.id}" data-label>{slider.label}</label>
        <input
          id="{type}_{slider.id}"
          name="{type}_{slider.id}"
          type="range"
          min={slider.range[0]}
          max={slider.range[1]}
          step={getStep(slider.range)}
          bind:value={$color[space][slider.id]}
        />
      </div>
    {/each}
  </form>
</div>

<style lang="scss">
  input[type='range'] {
    margin: 0;
  }
</style>
