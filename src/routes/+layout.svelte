<script>
  // Import global styles
  import '$src/sass/app.scss';

  // eslint-disable-next-line import/no-unresolved
  import { CONTEXT } from '$env/static/public';
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

<slot />
