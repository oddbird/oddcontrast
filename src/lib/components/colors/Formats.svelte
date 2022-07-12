<script lang="ts">
  import type Color from 'colorjs.io';
  import type { ColorSpace } from 'colorjs.io';

  import Output from '$lib/components/colors/Output.svelte';
  import { SPACES } from '$lib/constants';

  export let type: 'bg' | 'fg';
  export let color: Color;
  export let space: ColorSpace;

  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: otherSpaces = SPACES.filter((s) => s !== space);
</script>

<div data-content="formats">
  <h4 class="small-only label">{displayType} Color</h4>
  {#each otherSpaces as s (s)}
    <Output {type} {color} space={s} />
  {/each}
</div>

<style lang="scss">
  [data-content~='formats'] {
    margin-bottom: var(--double-gutter);
  }
</style>
