<script lang="ts">
  import Icon from '$lib/components/util/Icon.svelte';
  import { switchColors } from '$lib/stores';
</script>

<button type="button" onclick={switchColors} data-btn="icon switch">
  <Icon name="switch" />
  <span class="sr-only">Click to swap colors</span></button
>
