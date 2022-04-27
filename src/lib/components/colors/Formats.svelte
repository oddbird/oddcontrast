<script lang="ts">
  import Output from '$lib/components/colors/Output.svelte';
  import { SPACES } from '$lib/constants';
  import { bg, fg, space } from '$lib/stores';

  export let type: 'bg' | 'fg';

  $: color = type === 'bg' ? $bg : $fg;
  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
  $: otherSpaces = SPACES.filter((s) => s !== $space);
</script>

<div data-content="formats">
  <h3 class="small">Other {displayType} Color Formats</h3>
  {#each otherSpaces as space (space)}
    <Output {type} {color} {space} />
  {/each}
</div>
