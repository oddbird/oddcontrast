<script lang="ts">
  import { to } from 'colorjs.io/fn';

  import { SPACES } from '$lib/constants';
  import { bg, ColorSpace, fg, space } from '$lib/stores';

  let spaces: ColorSpace[] = [];

  $: spaces = SPACES.map((s) => {
    if (s === 'hex') return { id: 'hex', name: 'Hex' } as ColorSpace;
    return ColorSpace.get(s);
  });

  $: targetSpace = $space === 'hex' ? 'srgb' : $space;

  // Update color formats when space selection changes
  $: {
    if ($bg.space.id !== targetSpace) {
      $bg = to($bg, targetSpace);
    }
    if ($fg.space.id !== targetSpace) {
      $fg = to($fg, targetSpace);
    }
  }
</script>

<div data-field="color-space">
  <label for="color-space" data-label>Color Format</label>
  <select name="color-space" id="color-space" bind:value={$space}>
    {#each spaces as s}
      {#if s}
        <option value={s.id}>{s.name}</option>
      {/if}
    {/each}
  </select>
</div>

<style lang="scss">
  @use 'config';

  [data-field='color-space'] {
    align-items: center;
    column-gap: var(--gutter);
    display: grid;
    grid-template:
      'format-label' auto
      'format-input' auto / 1fr;
    justify-content: end;

    @include config.above('sm-page-break') {
      grid-template: 'format-label format-input' auto / 1fr minmax(10rem, auto);
    }
  }

  label {
    grid-area: format-label;

    @include config.above('sm-page-break') {
      text-align: right;
    }
  }

  select {
    grid-area: format-input;
  }
</style>
