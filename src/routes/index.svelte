<script lang="ts">
  import Colors from '$lib/components/colors/index.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Results from '$lib/components/Results.svelte';
  import { bg, fg } from '$lib/stores';

  $: bg_fallback = $bg.toString({ fallback: true });
  $: fg_fallback = $fg.toString({ fallback: true });
</script>

<div
  data-layout="app"
  style="--fgcolor: {fg_fallback}; --bgcolor: {bg_fallback};"
>
  <Header />
  <Results />
  <main data-layout="main">
    <Colors />
  </main>
  <Footer />
</div>
