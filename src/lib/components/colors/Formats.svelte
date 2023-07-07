<script lang="ts">
  import type { PlainColorObject } from 'colorjs.io/types/src/color';

  import Output from '$lib/components/colors/Output.svelte';
  import type { ColorSpaceId } from '$lib/constants';
  import { SPACES } from '$lib/constants';

  export let type: 'bg' | 'fg';
  export let color: PlainColorObject;
  export let space: ColorSpaceId;

  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: otherSpaces = SPACES.filter((s) => s !== space);
</script>

<div data-content="formats">
  <h4 class="small-only label">{displayType} Color</h4>
  {#each otherSpaces as s (s)}
    <Output {type} {color} space={s} />
  {/each}
  <Output {type} {color} space={'hex'} />
</div>

<style lang="scss">
  [data-content~='formats'] {
    margin-bottom: var(--double-gutter);
  }
</style>
