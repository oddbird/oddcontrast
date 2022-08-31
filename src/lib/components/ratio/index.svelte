<script lang="ts">
  import { contrast } from 'colorjs.io/fn';

  import Result from '$lib/components/ratio/Result.svelte';
  import { RATIOS } from '$lib/constants';
  import { bg, fg } from '$lib/stores';

  $: ratio = contrast($bg, $fg, 'WCAG21');
  $: displayRatio = Math.round((ratio + Number.EPSILON) * 100) / 100;
</script>

<aside data-layout="results">
  <div class="contrast-info">
    <h2 data-heading="large"><strong>Current</strong> Ratio</h2>

    <p>
      In WCAG 2, contrast is a measure of the difference in perceived brightness
      between two colors, expressed as a ratio. <a
        href="https://webaim.org/articles/contrast/#ratio"
        target="_blank"
        rel="noopener noreferrer">webaim.org/articles/contrast/#ratio</a
      >
    </p>
  </div>

  <div class="result-group">
    <h3 class="result-ratio">
      <span class="sr-only">The contrast ratio is</span>
      {displayRatio}:1
    </h3>
    <Result level="AA" type="Normal" {ratio} />
    <Result level="AAA" type="Normal" {ratio} />
    <Result level="AA" type="Large" {ratio} />
    <Result level="AAA" type="Large" {ratio} />
  </div>

  <div>
    <h4>AA Contrast Ratio</h4>
    <span><strong>{RATIOS.AA.Normal}</strong> : 1</span><span>Normal Text</span>
    <span><strong>{RATIOS.AA.Large}</strong> : 1</span><span>Large Text</span>

    <h4>AAA Contrast Ratio</h4>
    <span><strong>{RATIOS.AAA.Normal}</strong> : 1</span><span>Normal Text</span
    >
    <span><strong>{RATIOS.AAA.Large}</strong> : 1</span><span>Large Text</span>

    <h4>Large Text Size</h4>
    <span><strong>≥ 18 pt / 24 px</strong></span><span>Regular Weight</span>
    <span><strong>≥ 14 pt / 19 px</strong></span><span>Bold Weight</span>
  </div>
</aside>

<style lang="scss">
  @use 'config';

  [data-layout='results'] {
    background-color: var(--bgcolor);
    color: var(--fgcolor);

    @include config.between('sm-page-break', 'lg-page-break') {
      display: grid;
      gap: var(--double-gutter);
      grid-template-columns: 1fr auto;
    }
  }
</style>
