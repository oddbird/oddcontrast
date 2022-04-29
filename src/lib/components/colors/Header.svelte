<script lang="ts">
  import type { Writable } from 'svelte/store';

  import Close from '$lib/components/Close.svelte';
  import type { ColorSpace } from '$src/vendor/color.esm';
  import Color from '$src/vendor/color.esm';

  export let type: 'bg' | 'fg';
  export let color: Writable<Color>;
  export let space: Writable<ColorSpace>;

  $: display = $color.toString({ inGamut: false });
  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: editing = type !== 'bg';
  $: newValue = display;
  let hasError = false;

  // Reset when form closes
  $: if (!editing) {
    hasError = false;
    newValue = display;
  }

  // Remove errors when input changes
  const inputChanged = () => {
    hasError = false;
  };
  $: newValue, inputChanged();

  // Update color (but not color space) on form submit
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (display !== newValue) {
      let newColor;
      try {
        newColor = new Color(newValue).to($space);
      } catch (error) {
        hasError = true;
        console.error(error);
      }
      if (newColor) {
        color.set(newColor);
        editing = false;
      }
    } else {
      editing = false;
    }
  };
</script>

{#if editing}
  <form>
    <div data-field="color" data-group="header {type}" data-colors="form">
      <label for="{type}-color" data-label data-heading="small"
        >{displayType} Color</label
      >
      <input
        name="{type}-color"
        type="text"
        data-input="color"
        bind:value={newValue}
      />
      {#if hasError}
        <div class="error">Could not parse input as a valid color.</div>
      {/if}
      <button
        type="submit"
        on:click={handleSubmit}
        data-btn
        class="color-action">Submit</button
      >
      <button
        type="button"
        on:click={() => (editing = false)}
        data-btn="icon"
        class="color-cancel"
      >
        <Close />
        <span class="sr-only">Cancel</span></button
      >
    </div>
  </form>
{:else}
  <div data-group="header {type}" data-colors="preview">
    <h2 data-heading="small">{displayType} Color</h2>
    <div class="swatch {type}" />
    <button
      type="button"
      on:click={() => (editing = true)}
      data-btn
      class="color-action">Edit</button
    >
  </div>
{/if}

<style lang="scss">
  @use 'config';

  [data-colors] {
    align-items: center;
    display: grid;
    gap: var(--half-shim) var(--gutter);
    grid-template:
      'label label' auto
      'color color' var(--swatch)
      'action cancel' auto / auto 1fr;

    @include config.above('sm-page-break') {
      gap: var(--gutter);
      grid-template:
        'label cancel' auto
        'color action' var(--swatch) / 1fr 5rem;
    }
  }

  .color-cancel {
    grid-area: cancel;
    justify-self: end;
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
    grid-area: color;
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
</style>
