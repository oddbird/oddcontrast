<script lang="ts">
  import type { ColorObject, ColorSpaceId } from 'colorjs.io/fn';
  import type { Writable } from 'svelte/store';

  import { SLIDERS } from '$lib/constants';
  import { ColorSpace } from '$lib/stores';

  export let type: 'bg' | 'fg';
  export let color: Writable<ColorObject>;
  export let space: ColorSpaceId;

  $: spaceObject = ColorSpace.get(space);
  $: sliders = SLIDERS[space].map((id) => ({
    id,
    name: spaceObject.coords[id].name,
    range: spaceObject.coords[id].range ||
      spaceObject.coords[id].refRange || [0, 1],
    index: ColorSpace.resolveCoord({ space: spaceObject, coordId: id }).index,
  }));

  const getStep = (range: [number, number]) => {
    const diff = range[1] - range[0];
    if (diff <= 1) {
      return 0.001;
    } else if (diff < 10) {
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
    {#each sliders as slider (slider.id)}
      <div data-field="color-slider">
        <label for="{type}_{slider.id}" data-label>{slider.name}</label>
        <input
          id="{type}_{slider.id}"
          name="{type}_{slider.id}"
          type="range"
          min={slider.range[0]}
          max={slider.range[1]}
          step={getStep(slider.range)}
          bind:value={$color.coords[slider.index]}
        />
      </div>
    {/each}
  </form>
</div>

<style lang="scss">
  input[type='range'] {
    margin: 0;
  }

  [data-group~='sliders'] {
    margin-bottom: var(--triple-gutter);
  }

  [data-field~='color-slider'] {
    margin-bottom: var(--shim);
  }
</style>
