<script lang="ts">
  import { inGamut, type PlainColorObject, serialize, to } from 'colorjs.io/fn';
  import { type Writable } from 'svelte/store';

  import CopyButton from '$lib/components/util/CopyButton.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
  import type { ColorFormatId } from '$lib/constants';
  import { gamut } from '$lib/stores';
  import { getSpaceFromFormatId } from '$lib/utils';

  interface Props {
    type: 'bg' | 'fg';
    color: Writable<PlainColorObject>;
    format: ColorFormatId;
  }

  let { type, color, format }: Props = $props();

  let targetSpace = $derived(getSpaceFromFormatId(format));
  let display = $derived(serialize($color, { inGamut: false, format }));
  let displayType = $derived(type === 'bg' ? 'Background' : 'Foreground');
  let colorInGamut = $derived($gamut ? inGamut($color, $gamut) : true);
  let editing = $state(false);
  let inputValue = $state('');
  let hasError = $state(false);

  // When not editing, sync input value with color (e.g. when sliders change)
  $effect(() => {
    if (!editing) {
      inputValue = display;
    }
  });

  const handleFocus = () => {
    editing = true;
  };

  const handleBlur = () => {
    editing = false;
    hasError = false;
  };

  // Update color (but not color space) when input changes
  const handleInput = function (this: HTMLInputElement) {
    const { value } = this;
    inputValue = value;
    editing = true;
    hasError = false;
    if (display !== value) {
      let newColor;
      try {
        newColor = to(value, targetSpace, { inGamut: true });
      } catch (error) {
        try {
          // If it's possibly hex without a hash, add a hash and try again.
          if ([3, 4, 6, 8].includes(value.length)) {
            newColor = to(`#${value}`, targetSpace, { inGamut: true });
          } else {
            throw error;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (errorWithHash) {
          hasError = true;
          // Log original error
          console.error(error);
        }
      }
      if (newColor) {
        $color = newColor;
      }
    }
  };

  const handleKeydown = function (
    this: HTMLInputElement,
    event: KeyboardEvent,
  ) {
    switch (event.key) {
      case 'Enter':
      case 'Esc':
      case 'Escape':
        this.blur();
        break;
    }
  };
</script>

<div
  data-group="header {type}"
  data-colors="preview"
  data-column="tool"
  data-needs-changes={hasError}
>
  <div class="swatch {type} {colorInGamut ? 'in-gamut' : 'out-of-gamut'}">
    {#if !colorInGamut}
      <div class="gamut-warning">
        <span class="sr-only">Out of gamut</span><Icon name="warning" />
      </div>
    {/if}
  </div>
  <label for="{type}-color" data-label>
    {displayType} Color
  </label>
  <input
    id="{type}-color"
    name="{type}-color"
    type="text"
    data-input="color"
    value={inputValue}
    onfocus={handleFocus}
    onblur={handleBlur}
    oninput={handleInput}
    onkeydown={handleKeydown}
  />
  <CopyButton text={display} size="medium" />
  {#if hasError}
    <div data-color-info="warning">Could not parse input as a valid color.</div>
  {/if}
</div>

<style lang="scss">
  @use 'config';

  [data-colors] {
    align-items: center;
    display: grid;
    grid-template:
      'label label' auto
      'swatch swatch' var(--swatch-height, var(--swatch))
      'copy input' auto
      '.... error' minmax(var(--double-gutter), auto) / auto 1fr;

    @include config.above('sm-page-break') {
      --swatch-height: calc(2 * var(--swatch));
    }
  }

  .swatch {
    border: var(--border-width) solid var(--border);
    border-radius: var(--border-radius);
    grid-area: swatch;
    height: 100%;
    position: relative;
    &.out-of-gamut {
      outline: var(--warning) 3pt solid;
    }

    .gamut-warning {
      z-index: 1;
      position: absolute;
    }

    &.bg {
      &:after {
        background-color: var(--bgcolor);
      }
    }

    &.fg {
      &:after {
        background-color: var(--fgcolor);
      }
    }

    // helps with minor gap showing in some browsers
    &:after {
      border-radius: calc(var(--border-radius) - 1px);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      top: 0;
      left: var(--checkerboard-start, 0);
      width: var(--checkerboard-width, 100%);
    }

    &:before {
      --checkerboard-start: 50%;
      --checkerboard-width: 50%;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect fill="%23e8e8e8" width="30" height="30"/><rect x="30" y="30" width="30" height="30" fill="%23e8e8e8"/></svg>');
      background-position: 0 0;
      background-size: 30px 30px;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      z-index: -1;
    }
  }

  [data-input='color'] {
    grid-area: input;
  }

  [data-color-info='warning'] {
    grid-area: error;
  }

  [data-label] {
    --label-margin-block-end: var(--half-shim);
    grid-area: label;
  }

  [data-group] {
    margin-bottom: var(--gutter-plus);
  }
</style>
