<script lang="ts">
  import type { PlainColorObject } from 'colorjs.io/types/src/color';
  import type { Writable } from 'svelte/store';

  import type { ColorSpaceId } from '$lib/constants';
  import { SLIDERS } from '$lib/constants';
  import { ColorSpace } from '$lib/stores';

  export let type: 'bg' | 'fg';
  export let color: Writable<PlainColorObject>;
  export let space: ColorSpaceId;

  type Slider = {
    id: string;
    name: string;
    range: [number, number];
    index: number;
  };

  $: spaceObject = ColorSpace.get(space);
  $: sliders = SLIDERS[space].map((id: string): Slider => {
    const coord = spaceObject.coords[id];
    return {
      id,
      name: coord?.name ?? '',
      range: coord?.range || coord?.refRange || [0, 1],
      index: Number(
        ColorSpace.resolveCoord({
          space: spaceObject,
          coordId: id,
        }).index,
      ),
    };
  });

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
    <div data-field="color-slider">
      <label for="{type}_alpha" data-label>Alpha</label>
      <input
        id="{type}_alpha"
        name="{type}_alpha"
        type="range"
        min={0}
        max={1}
        step={getStep([0, 1])}
        bind:value={$color.alpha}
      />
    </div>
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
