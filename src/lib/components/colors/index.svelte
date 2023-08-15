<script lang="ts">
  import Formats from '$lib/components/colors/Formats.svelte';
  import Header from '$lib/components/colors/Header.svelte';
  import Sliders from '$lib/components/colors/Sliders.svelte';
  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import { bg, fg, format, premultipliedFg } from '$lib/stores';
</script>

<h2 class="sr-only">Check the contrast ratio between two colors</h2>

<SupportWarning format={$format} />

<form data-form="contrast-checker" data-layout="color-form">
  <Header type="bg" color={bg} format={$format} premultipliedFg={null} />
  <Sliders type="bg" color={bg} format={$format} />

  <Header
    type="fg"
    color={fg}
    format={$format}
    premultipliedFg={$premultipliedFg}
  />
  <Sliders type="fg" color={fg} format={$format} />
</form>

<h3 class="label section-heading">Additional Formats</h3>
<div data-layout="split">
  <Formats type="bg" color={$bg} format={$format} />
  <Formats type="fg" color={$fg} format={$format} />
</div>

<style lang="scss">
  @use 'config';

  [data-form~='contrast-checker'] {
    margin-block: var(--double-gutter) var(--gutter);
  }

  [data-layout] {
    column-gap: var(--triple-gutter);
  }
</style>
