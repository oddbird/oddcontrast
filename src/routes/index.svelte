<script lang="ts">
  import { display } from 'colorjs.io/fn';

  import Colors from '$lib/components/colors/index.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Results from '$lib/components/Results.svelte';
  import { bg, fg } from '$lib/stores';

  $: bg_fallback = display($bg);
  $: fg_fallback = display($fg);
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
