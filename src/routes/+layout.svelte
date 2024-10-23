<script lang="ts">
  // Import global styles
  import '$src/sass/app.scss';

  import type { Snippet } from 'svelte';

  // eslint-disable-next-line import/no-unresolved
  import { CONTEXT } from '$env/static/public';

  interface Props {
    children: Snippet;
  }
  let { children }: Props = $props();
</script>

<svelte:head>
  <title>OddContrast</title>
  <!-- Plausible analytics -->
  {#if CONTEXT === 'production'}
    <script
      defer
      data-domain="oddcontrast.com"
      src="https://plausible.io/js/script.js"
    ></script>
  {/if}
</svelte:head>

{@render children()}
