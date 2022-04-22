<script lang="ts">
  import _ from 'lodash';

  import Output from '$lib/components/colors/Output.svelte';
  import { SPACES } from '$lib/constants';
  import { bg, fg, space } from '$lib/stores';

  export let type: 'bg' | 'fg';

  $: color = type === 'bg' ? $bg : $fg;
  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
</script>

<div data-content="formats">
  <h3 class="small">Other {displayType} Color Formats</h3>
  {#each _.without(SPACES, $space) as space (space)}
    <Output {type} {color} {space} />
  {/each}
</div>
