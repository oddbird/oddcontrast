<script lang="ts">
  import type { Writable } from 'svelte/store';

  import { space } from '$lib/stores';
  import Color from '$src/vendor/color.esm';

  export let type: 'bg' | 'fg';
  export let color: Writable<Color>;

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
      let newColor: Color;
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
    <div data-field="color" data-group="header {type}">
      <label for="{type}-color" data-label>{displayType} Color</label>
      <input name="{type}-color" type="text" bind:value={newValue} />
      {#if hasError}
        <div class="error">Could not parse input as a valid color.</div>
      {/if}
      <button type="submit" on:click={handleSubmit}>Submit</button>
      <button type="button" on:click={() => (editing = false)}>Cancel</button>
    </div>
  </form>
{:else}
  <div data-group="header {type}">
    <h2>{displayType} Color</h2>
    <div class="swatch {type}" />
    <button type="button" on:click={() => (editing = true)}>Edit</button>
  </div>
{/if}

<style lang="scss">
  @use 'config';

  .swatch {
    @include config.square('swatch');
    border: var(--border-width) solid var(--text);

    &.bg {
      background-color: var(--bgcolor);
    }

    &.fg {
      background-color: var(--fgcolor);
    }
  }
</style>
