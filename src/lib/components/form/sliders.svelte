<script lang="ts">
  import type { Writable } from 'svelte/store';

  import { SLIDERS } from '$lib/constants';
  import type Color from '$src/vendor/color.esm';
  import type { ColorSpace } from '$src/vendor/color.esm';

  export let type: 'bg' | 'fg';
  export let color: Writable<Color>;

  $: space = $color.spaceId as ColorSpace;
</script>

<div data-actions="edit-color" data-group="sliders {type}">
  {#each SLIDERS[space] as slider}
    <div data-field="color-slider">
      <label for="{type}_{slider.id}" data-label>{slider.label}</label>
      <input
        id="{type}_{slider.id}"
        name="{type}_{slider.id}"
        type="range"
        min={slider.range[0]}
        max={slider.range[1]}
        step={(slider.range[1] - slider.range[0]) / 100}
        bind:value={$color[space][slider.id]}
      />
    </div>
  {/each}
</div>

<style lang="scss">
  input[type='range'] {
    margin: 0;
  }
</style>
