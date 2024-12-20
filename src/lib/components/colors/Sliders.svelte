<script lang="ts">
  import type { PlainColorObject } from 'colorjs.io/fn';
  import type { Writable } from 'svelte/store';

  import { type ColorFormatId, SLIDERS } from '$lib/constants';
  import { ColorSpace, gamut } from '$lib/stores';
  import { getSpaceFromFormatId, sliderGradient } from '$lib/utils';

  interface Props {
    type: 'bg' | 'fg';
    color: Writable<PlainColorObject>;
    format: ColorFormatId;
  }

  let { type, color, format }: Props = $props();

  let targetSpace = $derived(getSpaceFromFormatId(format));
  let spaceObject = $derived(ColorSpace.get(targetSpace));
  let sliders = $derived(
    SLIDERS[format].map((id) => {
      const coord = spaceObject.coords[id];
      const range = coord?.range ?? coord?.refRange ?? [0, 1];
      const gradient = sliderGradient({
        color: $color,
        channel: id,
        range: range,
        gamut: $gamut,
      });
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
    }),
  );

  let alphaGradient = $derived(
    sliderGradient({
      color: $color,
      channel: 'alpha',
      range: [0, $color.alpha],
      gamut: $gamut,
    }),
  );

  const handleInput = (
    e: Event & { currentTarget: EventTarget & HTMLInputElement },
    index?: number,
  ) => {
    const value = +e.currentTarget.value;
    if (index !== undefined) {
      $color.coords[index] = value;
    } else {
      $color.alpha = value;
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
        style={`--stops: ${slider.gradient}`}
        value={$color.coords[slider.index]}
        oninput={(e) => handleInput(e, slider.index)}
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
      oninput={(e) => handleInput(e)}
      data-channel="alpha"
    />
  </div>
</div>

<style lang="scss">
  input[type='range'] {
    margin: 0;
    display: block;
    appearance: none;
    background: linear-gradient(to right, var(--stops));
    &[data-channel='alpha'] {
      background: linear-gradient(to right, var(--stops)),
        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect fill="%23e8e8e8" width="30" height="30"/><rect x="30" y="30" width="30" height="30" fill="%23e8e8e8"/></svg>');
    }
  }

  [data-group~='sliders'] {
    --label-margin-block-end: var(--half-shim);
    margin-bottom: var(--triple-gutter);
  }

  [data-field~='color-slider'] {
    margin-bottom: var(--shim-plus);
  }
</style>
