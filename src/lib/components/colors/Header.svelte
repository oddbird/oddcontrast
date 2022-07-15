<script lang="ts">
  import type { ColorObject, ColorSpaceId } from 'colorjs.io/fn';
  import { serialize, to } from 'colorjs.io/fn';
  import type { Writable } from 'svelte/store';

  export let type: 'bg' | 'fg';
  export let color: Writable<ColorObject>;
  export let space: ColorSpaceId;

  $: display = serialize($color, { inGamut: false });
  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: editing = false;
  $: inputValue = '';
  let hasError = false;

  // When not editing, sync input value with color (e.g. when sliders change)
  $: if (!editing) {
    inputValue = display;
  }

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
        newColor = to(value, space);
      } catch (error) {
        hasError = true;
        console.error(error);
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
  data-needs-changes={hasError}
>
  <div class="swatch {type}" />
  <label for="{type}-color" data-label>
    {displayType} Color
  </label>
  <input
    id="{type}-color"
    name="{type}-color"
    type="text"
    data-input="color"
    value={inputValue}
    on:focus={handleFocus}
    on:blur={handleBlur}
    on:input={handleInput}
    on:keydown={handleKeydown}
  />
  {#if hasError}
    <div data-color-info="warning">Could not parse input as a valid color.</div>
  {/if}
</div>

<style lang="scss">
  @use 'config';

  [data-colors] {
    display: grid;
    grid-template:
      'label' auto
      'swatch' var(--swatch-height, var(--swatch))
      'input' auto
      'error' minmax(var(--double-gutter), auto) / 1fr;

    @include config.above('sm-page-break') {
      --swatch-height: calc(2 * var(--swatch));
    }
  }

  .swatch {
    border: var(--border-width) solid var(--border);
    grid-area: swatch;
    height: 100%;

    &.bg {
      background-color: var(--bgcolor);
    }

    &.fg {
      background-color: var(--fgcolor);
    }
  }

  [data-input='color'] {
    border-width: 0 0 var(--border-width) 0;
    font-size: var(--input-size, var(--input-large));
    grid-area: input;
    padding: var(--shim) 0.25ch;

    @include config.between('sm-page-break', 'lg-page-break') {
      --input-size: var(--input-small);
    }
  }

  [data-color-info='warning'] {
    grid-area: error;
  }

  [data-label] {
    --label-margin-bottom: var(--half-shim);
    grid-area: label;
  }

  [data-group] {
    margin-bottom: var(--gutter-plus);
  }
</style>
