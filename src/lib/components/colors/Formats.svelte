<script lang="ts">
  import Output from '$lib/components/colors/Output.svelte';
  import { SPACES } from '$lib/constants';
  import type Color from '$src/vendor/color.esm';
  import type { ColorSpace } from '$src/vendor/color.esm';

  export let type: 'bg' | 'fg';
  export let color: Color;
  export let space: ColorSpace;

  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: otherSpaces = SPACES.filter((s) => s !== space);
</script>

<div data-content="formats">
  <h3 class="small">Other {displayType} Color Formats</h3>
  {#each otherSpaces as s (s)}
    <Output {type} {color} space={s} />
  {/each}
</div>
