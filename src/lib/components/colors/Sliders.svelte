<script lang="ts">
  import type { PlainColorObject } from 'colorjs.io/types/src/color';
  import type { Writable } from 'svelte/store';

  import type { ColorFormatId } from '$lib/constants';
  import { SLIDERS } from '$lib/constants';
  import { ColorSpace } from '$lib/stores';
  import { getSpaceFromFormatId, sliderGradient } from '$lib/utils';

  export let type: 'bg' | 'fg';
  export let color: Writable<PlainColorObject>;
  export let format: ColorFormatId;

  $: targetSpace = getSpaceFromFormatId(format);
  $: spaceObject = ColorSpace.get(targetSpace);
  $: sliders = SLIDERS[format].map((id) => {
    const coord = spaceObject.coords[id];
    const range = coord?.range || coord?.refRange || [0, 1];
    const gradient = sliderGradient($color, id, range);
    return {
      id,
      name: coord?.name ?? '',
      range,
      index: Number(
        ColorSpace.resolveCoord({
          space: spaceObject,
          coordId: id,
        }).index,
      ),
      gradient,
    };
  });

  $: alphaGradient = sliderGradient($color, 'alpha', [0, $color.alpha]);

  const handleInput = (
    e: Event & { currentTarget: EventTarget & HTMLInputElement },
    index?: number,
  ) => {
    const { value } = e.currentTarget;
    const numberVal = Number(value);
    if (index !== undefined) {
      $color.coords[index] = numberVal;
    } else {
      $color.alpha = numberVal;
    }
  };

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
    {#each sliders as slider (`${type}-${format}-${slider.id}`)}
      <div data-field="color-slider">
        <label for="{type}_{slider.id}" data-label>{slider.name}</label>
        <input
          id="{type}_{slider.id}"
          name="{type}_{slider.id}"
          type="range"
          min={slider.range[0]}
          max={slider.range[1]}
          step={getStep(slider.range)}
          style={`--stops: ${slider.gradient}`}
          value={$color.coords[slider.index]}
          on:input={(e) => handleInput(e, slider.index)}
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
        style={`--stops: ${alphaGradient}`}
        value={$color.alpha}
        on:input={(e) => handleInput(e)}
      />
    </div>
  </form>
</div>

<style lang="scss">
  input[type='range'] {
    margin: 0;
    display: block;
    appearance: none;
    background: linear-gradient(to right, var(--stops));
  }

  [data-group~='sliders'] {
    margin-bottom: var(--triple-gutter);
  }

  [data-field~='color-slider'] {
    margin-bottom: var(--shim);
  }
</style>
