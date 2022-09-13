<script lang="ts">
  import { contrast } from 'colorjs.io/fn';

  import Result from '$lib/components/ratio/Result.svelte';
  import { RATIOS } from '$lib/constants';
  import { bg, fg } from '$lib/stores';

  $: ratio = contrast($bg, $fg, 'WCAG21');
  $: displayRatio = Math.round((ratio + Number.EPSILON) * 100) / 100;
</script>

<aside data-layout="results">
  <h2 data-heading="large"><strong>Current</strong> Ratio</h2>

  <h3 class="result-ratio">
    <span class="sr-only">The contrast ratio is</span>
    {displayRatio}:1
  </h3>

  <p class="ratio-intro">
    In WCAG 2, contrast is a measure of the difference in perceived brightness
    between two colors, expressed as a ratio. <a
      href="https://webaim.org/articles/contrast/#ratio"
      target="_blank"
      rel="noopener noreferrer">webaim.org/articles/contrast/#ratio</a
    >
  </p>

  <div class="result-status">
    <Result level="AA" type="Normal" {ratio} />
    <Result level="AAA" type="Normal" {ratio} />
    <Result level="AA" type="Large" {ratio} />
    <Result level="AAA" type="Large" {ratio} />
  </div>

  <div class="contrast-defined">
    <h4 class="label">AA Contrast Ratio</h4>

    <dl>
      <dt><strong>{RATIOS.AA.Normal}</strong> : 1</dt>
      <dd>Normal Text</dd>

      <dt><strong>{RATIOS.AA.Large}</strong> : 1</dt>
      <dd>Large Text</dd>
    </dl>

    <h4 class="label">AAA Contrast Ratio</h4>
    <dl>
      <dt><strong>{RATIOS.AAA.Normal}</strong> : 1</dt>
      <dd>Normal Text</dd>

      <dt><strong>{RATIOS.AAA.Large}</strong> : 1</dt>
      <dd>Large Text</dd>
    </dl>

    <h4 class="label">Large Text Size</h4>
    <dl>
      <dt><strong>≥ 18 pt / 24 px</strong></dt>
      <dd>Regular Weight</dd>

      <dt><strong>≥ 14 pt / 19 px</strong></dt>
      <dd>Bold Weight</dd>
    </dl>
  </div>
</aside>

<style lang="scss">
  @use 'config';

  [data-layout='results'] {
    background-color: var(--bgcolor);
    color: var(--fgcolor);
    display: grid;
    gap: var(--gutter-plus);
    grid-template:
      'headline' auto
      'rationumber' auto
      'status' auto
      'ratiointro' 0 / 1fr;

    @include config.between('sm-page-break', 'lg-page-break') {
      display: grid;
      gap: var(--gutter-plus);
      grid-template:
        'headline   rationumber  status' auto
        'ratiointro ratiointro   status' 1fr / minmax(32ch, min-content)
        min-content 1fr;
    }
  }

  [data-heading] {
    grid-area: headline;
    margin: 0 0 var(--gutter);
  }

  .result-ratio {
    grid-area: rationumber;
  }

  .ratio-intro {
    grid-area: ratiointro;
  }

  .result-status {
    display: grid;
    gap: var(--double-gutter);
    grid-area: status;
    grid-template-columns: 1fr 1fr;
    text-align: center;

    @include config.above('lg-page-break') {
      margin-bottom: var(--triple-gutter);
    }
  }

  .result-ratio {
    font-size: var(--ratio-size, var(--large));
    line-height: 1.1;

    @include config.above('lg-page-break') {
      --ratio-size: var(--xlarge);
      margin-bottom: var(--triple-gutter);
    }
  }

  a {
    --link: var(--fgcolor);
    --link-focus: var(--fgcolor);
  }
</style>
