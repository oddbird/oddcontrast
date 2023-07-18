<script lang="ts">
  import { serialize, to } from 'colorjs.io/fn';
  import type { PlainColorObject } from 'colorjs.io/types/src/color';
  import type { Writable } from 'svelte/store';

  import type { ColorFormatId } from '$lib/constants';
  import { getSpaceFromFormatId } from '$lib/utils';

  export let type: 'bg' | 'fg';
  export let color: Writable<PlainColorObject>;
  export let format: ColorFormatId;

  $: targetSpace = getSpaceFromFormatId(format);
  $: display = serialize($color, { inGamut: false, format });
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
        newColor = to(value, targetSpace);
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
  data-column="tool"
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
    border-radius: var(--border-radius);
    grid-area: swatch;
    height: 100%;
    position: relative;

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
    border-width: 0 0 var(--border-width) 0;
    grid-area: input;
    padding: var(--shim) 0.25ch;
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
