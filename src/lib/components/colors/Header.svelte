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

  $: if (!editing) {
    inputValue = display;
  }

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

  const handleFocus = () => {
    editing = true;
  };

  const handleBlur = () => {
    editing = false;
    hasError = false;
  };
</script>

<div data-group="header {type}" data-colors="preview">
  <label for="{type}-color" data-label data-heading="small">
    {displayType} Color
  </label>
  <div class="swatch {type}" />
  <input
    id="{type}-color"
    name="{type}-color"
    type="text"
    data-input="color"
    value={inputValue}
    on:input={handleInput}
    on:focus={handleFocus}
    on:blur={handleBlur}
  />
  {#if hasError}
    <div class="error">Could not parse input as a valid color.</div>
  {/if}
</div>

<style lang="scss">
  @use 'config';

  [data-colors] {
    align-items: center;
    display: grid;
    gap: var(--half-shim) var(--double-gutter);
    grid-template:
      'label  label' auto
      'color  color' var(--swatch)
      'action cancel' auto
      'error  error' auto / auto 1fr;

    @include config.above('sm-page-break') {
      gap: var(--half-shim) var(--gutter);
      grid-template:
        'label cancel' auto
        'color action' var(--swatch)
        'error error' 1em / 1fr 5rem;
    }
  }

  .color-cancel {
    display: flex;
    grid-area: cancel;
    justify-self: end;

    &:hover {
      box-shadow: 0 0 0 1px var(--text);
    }
  }

  .color-action {
    justify-content: center;
    grid-area: action;

    @include config.below('sm-page-break') {
      margin-top: var(--gutter);
    }
  }

  [data-colors~='preview'] {
    --form-columns: 1fr auto;
  }

  .swatch {
    border: var(--border-width) solid var(--text);
    // grid-area: color;
    height: var(--swatch);
    width: 100%;

    &.bg {
      background-color: var(--bgcolor);
    }

    &.fg {
      background-color: var(--fgcolor);
    }
  }

  [data-input='color'] {
    border-width: 0 0 var(--border-width) 0;
    grid-area: color;
    font-size: var(--medium);
    height: var(--swatch);
    padding-inline: 0;
  }

  .error {
    align-self: start;
    color: var(--warning);
    grid-area: error;
  }
</style>
