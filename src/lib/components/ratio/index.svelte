<script lang="ts">
  import { contrast } from 'colorjs.io/fn';

  import Icon from '$lib/components/Icon.svelte';
  import Result from '$lib/components/ratio/Result.svelte';
  import { RATIOS } from '$lib/constants';
  import { bg, fg } from '$lib/stores';

  $: ratio = contrast($bg, $fg, 'WCAG21');
  $: displayRatio = Math.round((ratio + Number.EPSILON) * 100) / 100;
</script>

<aside data-layout="results">
  <div class="contrast-info">
    <h2 data-heading="large"><strong>Current</strong> Ratio</h2>

    <h3 data-heading="large" class="result-ratio">
      <span class="sr-only">The contrast ratio is</span>
      {displayRatio}:1
    </h3>

    <p class="result-intro">
      In WCAG 2, contrast is a measure of the difference in perceived brightness
      between two colors, expressed as a ratio. <a
        href="https://webaim.org/articles/contrast/#ratio"
        target="_blank"
        rel="noopener noreferrer"
        >Learn more about contrast ratio <span class="no-wrap"
          >requirements. <span class="sr-only">(opens in a new tab)</span>
          <Icon name="newtab" /></span
        ></a
      >
    </p>
  </div>

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
    gap: var(--result-layout-gap, var(--double-gutter));
    grid-template:
      'contrastinfo' min-content
      'status' min-content / 1fr;

    @include config.between('sm-page-break', 'lg-page-break') {
      --result-layout-gap: var(--gutter-plus);
      grid-template: 'contrastinfo status' auto / 1fr 1fr;
    }

    @include config.above('lg-page-break') {
      --result-layout-gap: var(--triple-gutter);
    }
  }

  .contrast-info {
    grid-area: contrastinfo;
    display: grid;
    grid-template:
      'heading' min-content
      'number' min-content / 100%;

    @include config.between('sm-page-break', 'lg-page-break') {
      gap: var(--shim) var(--gutter);
      grid-template:
        'heading number' min-content
        'intro   intro' 1fr / auto 1fr;
    }

    @include config.above('lg-page-break') {
      grid-template:
        'heading' auto
        'intro' auto
        'number' auto / 100%;
    }
  }

  [data-heading] {
    grid-area: heading;
  }

  .result-intro {
    grid-area: intro;

    @include config.below('sm-page-break') {
      display: none;
    }
  }

  .result-ratio {
    grid-area: number;

    @include config.above('lg-page-break') {
      --heading-size: var(--xlarge);
    }
  }

  .result-status {
    display: grid;
    gap: var(--gutter) var(--double-gutter);
    grid-area: status;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }

  a {
    --link: var(--fgcolor);
    --link-focus: var(--fgcolor);
    border-bottom: 1px solid var(--fgcolor);
    text-decoration: none;
    transition: border-bottom-width var(--fast) ease-out;

    &:hover,
    &:focus {
      border-bottom-width: 3px;
    }
  }

  .contrast-defined {
    @include config.below('lg-page-break') {
      display: none;
    }
  }
</style>
