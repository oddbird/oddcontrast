<script lang="ts">
  import Formats from '$lib/components/colors/Formats.svelte';
  import Header from '$lib/components/colors/Header.svelte';
  import Sliders from '$lib/components/colors/Sliders.svelte';
  import SupportWarning from '$lib/components/colors/SupportWarning.svelte';
  import { bg, fg, format } from '$lib/stores';

  import SwitchButton from './SwitchButton.svelte';
</script>

<h2 class="sr-only">Check the contrast ratio between two colors</h2>

<SupportWarning format={$format} />

<form data-form="contrast-checker" data-layout="color-form">
  <Header type="bg" color={bg} format={$format} />
  <Sliders type="bg" color={bg} format={$format} />
  <div data-actions="swap-colors">
    <SwitchButton />
  </div>
  <Header type="fg" color={fg} format={$format} />
  <Sliders type="fg" color={fg} format={$format} />
</form>

<div data-layout="color-formats">
  <Formats type="bg" color={$bg} format={$format} />
  <Formats type="fg" color={$fg} format={$format} />
</div>

<style lang="scss">
  @use 'config';

  [data-form~='contrast-checker'] {
    margin-block: var(--double-gutter) var(--gutter);
  }

  [data-layout] {
    column-gap: var(--gutter);
  }

  [data-actions='swap-colors'] {
    display: grid;
    place-content: center;
  }
</style>
