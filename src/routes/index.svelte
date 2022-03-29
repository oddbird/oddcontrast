<script lang="ts">
  import Banner from '$lib/banner.svelte';
  import Footer from '$lib/footer.svelte';
  import Form from '$lib/form/index.svelte';
  import Header from '$lib/header.svelte';

  import { bg, fg } from '../stores';
</script>

<main data-layout="main" style="--fgcolor: {$fg}; --bgcolor: {$bg};">
  <Banner />
  <Header />
  <Form />
</main>

<Footer />
