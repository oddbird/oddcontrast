<script lang="ts">
  import { to } from 'colorjs.io/fn';

  import { FORMATS } from '$lib/constants';
  import { bg, ColorSpace, fg, format } from '$lib/stores';
  import { getSpaceFromFormatId } from '$lib/utils';

  let spaces: ColorSpace[] = FORMATS.map((s) => {
    if (s === 'hex') return { id: 'hex', name: 'Hex' } as ColorSpace;
    return ColorSpace.get(s);
  });

  // Update color formats when space selection changes
  // Use $effect.pre to change colors before the $format update is applied.
  $effect.pre(() => {
    let targetSpace = getSpaceFromFormatId($format);
    if ($bg.space.id !== targetSpace) {
      $bg = to($bg, targetSpace, { inGamut: true });
    }
    if ($fg.space.id !== targetSpace) {
      $fg = to($fg, targetSpace, { inGamut: true });
    }
  });
</script>

<div data-field="color-format">
  <label for="color-format" data-label>Format</label>
  <select name="color-format" id="color-format" bind:value={$format}>
    {#each spaces as space (space.id)}
      {#if space}
        <option value={space.id}>{space.name}</option>
      {/if}
    {/each}
  </select>
</div>

<style lang="scss">
  @use 'config';

  [data-field='color-format'] {
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
