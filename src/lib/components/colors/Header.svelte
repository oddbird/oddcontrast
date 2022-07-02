<script lang="ts">
  import type { ColorSpace, ColorString } from 'colorjs.io';
  import Color from 'colorjs.io';
  import type { Writable } from 'svelte/store';

  export let type: 'bg' | 'fg';
  export let color: Writable<Color>;
  export let space: Writable<ColorSpace>;

  $: display = $color.toString({ inGamut: false });
  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: editing = false;
  $: inputValue = '' as string | ColorString;
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
        newColor = new Color(value).to($space);
      } catch (error) {
        hasError = true;
        console.error(error);
      }
      if (newColor) {
        color.set(newColor);
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
  <label for="{type}-color" data-label v="small">
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
    align-items: center;
    display: grid;
    grid-template:
      'label label' auto
      'input color' var(--swatch)
      'error error' 1rem / 1fr var(--swatch);

    @include config.above('sm-page-break') {
      grid-template:
        'label' auto
        'input' auto
        'error' 1rem / 1fr;
    }
  }

  [data-colors~='preview'] {
    --form-columns: 1fr auto;
  }

  .swatch {
    border: var(--border-width) solid var(--swatch-border-color, transparent);
    grid-area: color;

    @include config.below('sm-page-break') {
      --swatch-border-color: var(--text);
      height: var(--swatch);
    }

    &.bg {
      background-color: var(--bgcolor);
    }

    &.fg {
      background-color: var(--fgcolor);
    }
  }

  [data-input='color'] {
    border-width: 0 0 var(--border-width) 0;
    grid-area: input;
    font-size: var(--medium);
    padding-inline: 0;
  }

  [data-color-info='warning'] {
    align-self: start;
    grid-area: error;
  }

  [data-label] {
    margin-bottom: var(--gutter);
  }

  [data-group] {
    margin-bottom: var(--gutter);
  }
</style>
