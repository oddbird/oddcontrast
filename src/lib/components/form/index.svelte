<script lang="ts">
  import Formats from '$lib/components/form/formats.svelte';
  import Input from '$lib/components/form/input.svelte';
  import Sliders from '$lib/components/form/sliders.svelte';
  import { bg, bg_h, bg_l, bg_s, fg, fg_h, fg_l, fg_s } from '$lib/stores';
</script>

<div data-layout="color-tools">
  <form data-form="contrast-checker" data-layout="split">
    <Input type="bg" value={$bg} />
    <Sliders type="bg" h={bg_h} s={bg_s} l={bg_l} />

    <Input type="fg" value={$fg} />
    <Sliders type="fg" h={fg_h} s={fg_s} l={fg_l} />
  </form>

  <div data-layout="split">
    <Formats type="bg" />
    <Formats type="fg" />
  </div>
</div>

<style lang="scss" scoped>
  [data-form~='contrast-checker'] {
    grid-auto-flow: dense;
  }
</style>
