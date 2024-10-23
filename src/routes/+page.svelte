<script lang="ts">
  import { display } from 'colorjs.io/fn';
  import debounce from 'lodash/debounce';
  import { onMount } from 'svelte';

  // eslint-disable-next-line import/no-unresolved
  import { replaceState } from '$app/navigation';
  import Colors from '$lib/components/colors/index.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
  import Ratio from '$lib/components/ratio/index.svelte';
  import { bg, fg, format } from '$lib/stores';
  import { hashToStoreValues, storeValuesToHash } from '$src/lib/utils';

  let bg_fallback = $derived(display($bg));
  let fg_fallback = $derived(display($fg));

  onMount(() => {
    hashToColors();
    bg.subscribe(debouncedColorsToHash);
    fg.subscribe(debouncedColorsToHash);
    format.subscribe(debouncedColorsToHash);
  });

  function colorsToHash() {
    const hashString = storeValuesToHash($bg, $fg, $format);
    replaceState(`#${hashString}`, {});
  }

  const debouncedColorsToHash = debounce(colorsToHash, 100);

  function hashToColors() {
    const hash = window.location.hash;

    const result = hashToStoreValues(hash.replace('#', ''));
    if (!result) return;

    bg.set(result.bg);
    fg.set(result.fg);
    format.set(result.format);
  }
</script>

<div
  data-layout="app"
  style="--fgcolor: {fg_fallback}; --bgcolor: {bg_fallback};"
>
  <Header />
  <Ratio />
  <main data-layout="main">
    <Colors />
  </main>
  <Footer />
</div>
