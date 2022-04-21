<script lang="ts">
  import Footer from '$lib/components/footer.svelte';
  import Form from '$lib/components/form/index.svelte';
  import Header from '$lib/components/header.svelte';
  import Results from '$lib/components/results.svelte';
  import { bg_display, fg_display } from '$lib/stores';
</script>

<div
  data-layout="app"
  style="--fgcolor: {$fg_display}; --bgcolor: {$bg_display};"
>
  <Header />
  <Results />
  <main data-layout="main">
    <Form />
  </main>
  <Footer />
</div>
