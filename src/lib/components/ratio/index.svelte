<script lang="ts">
  import { contrast, mix } from 'colorjs.io/fn';

  import ColorIssues from '$lib/components/ratio/ColorIssues.svelte';
  import Result from '$lib/components/ratio/Result.svelte';
  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
  import { RATIOS } from '$lib/constants';
  import { bg, fg } from '$lib/stores';

  let fgPremultiplied = $derived.by(() => {
    if ($fg.alpha === 1 || $bg.alpha !== 1) return $fg;

    return mix($bg, $fg, $fg.alpha, {
      space: 'srgb',
      premultiplied: false,
    });
  });
  let ratio = $derived(contrast($bg, fgPremultiplied, 'WCAG21'));
  let displayRatio = $derived(Math.round((ratio + Number.EPSILON) * 100) / 100);
  let pass = $derived(ratio >= RATIOS.AA.Normal);
  let alphaWarning = $derived.by(() => {
    if ($bg.alpha !== 1)
      return 'Alpha is not considered when the background is not opaque.';
    if ($fg.alpha !== 1) return 'This ratio is our best estimate.';
    return null;
  });
</script>

<aside data-layout="results">
  <div class="contrast-info">
    <h2 data-heading="large"><strong>Current</strong> Ratio</h2>

    <h3 data-pass={pass} data-heading="large" class="result-ratio">
      <span class="sr-only">The contrast ratio is</span>
      <span class="result-ratio-number">{displayRatio}:1</span>
    </h3>
    {#if alphaWarning}
      <p><Icon name="warning" />{alphaWarning}</p>
    {/if}

    <p class="result-intro">
      In WCAG 2, contrast is a measure of the difference in perceived brightness
      between two colors, expressed as a ratio. <ExternalLink
        href="https://webaim.org/articles/contrast/#ratio"
        >Learn more about contrast ratio requirements</ExternalLink
      >.
    </p>
  </div>

  <div class="result-status">
    <Result level="AA" type="Normal" {ratio} />
    <Result level="AAA" type="Normal" {ratio} />
    <Result level="AA" type="Large" {ratio} />
    <Result level="AAA" type="Large" {ratio} />
  </div>

  <div class="contrast-defined">
    <h3 class="label">AA Contrast Ratio</h3>

    <dl>
      <dt><strong>{RATIOS.AA.Normal}</strong> : 1</dt>
      <dd>Normal Text</dd>

      <dt><strong>{RATIOS.AA.Large}</strong> : 1</dt>
      <dd>Large Text</dd>
    </dl>

    <h3 class="label">AAA Contrast Ratio</h3>
    <dl>
      <dt><strong>{RATIOS.AAA.Normal}</strong> : 1</dt>
      <dd>Normal Text</dd>

      <dt><strong>{RATIOS.AAA.Large}</strong> : 1</dt>
      <dd>Large Text</dd>
    </dl>

    <h3 class="label">Large Text Size</h3>
    <dl>
      <dt><strong>≥ 24px</strong></dt>
      <dd>Regular Weight</dd>

      <dt><strong>≥ 19px</strong></dt>
      <dd>Bold Weight</dd>
    </dl>
  </div>
  <ColorIssues {pass} />
</aside>

<style lang="scss">
  @use 'config';

  [data-layout='results'] {
    background-color: var(--bgcolor);
    color: var(--fgcolor);
    display: grid;
    gap: var(--result-layout-gap, var(--shim));
    grid-template:
      'contrastinfo' min-content
      'status' min-content
      'contrastdefined' min-content
      'knownissues' min-content / 1fr;

    @include config.between('sm-page-break', 'lg-page-break') {
      --result-layout-gap: var(--gutter-plus);
      grid-template:
        'contrastinfo status' auto
        '... knownissues' auto / 1fr 1fr;
    }

    @include config.above('lg-page-break') {
      --result-layout-gap: var(--triple-gutter);
    }
  }

  .contrast-info {
    display: grid;
    grid-area: contrastinfo;
    grid-template:
      'heading' min-content
      'number' min-content / 100%;

    @include config.between('sm-column-break', 'lg-page-break') {
      gap: var(--shim) var(--gutter);
      // fixed width column to prevent layout shift as the ratio number changes
      grid-template:
        'heading number' min-content
        'intro   intro' 1fr / auto var(--ratio-width);
    }

    @include config.above('lg-page-break') {
      gap: var(--shim);
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
    margin-bottom: var(--gutter);

    @include config.below('sm-page-break') {
      display: none;
    }

    :global(a) {
      --link: var(--fgcolor);
      --link-focus: var(--fgcolor);
    }
  }

  .result-ratio {
    align-items: start;
    display: inline-flex;
    grid-area: number;
    line-height: 0.7; // weird number alignment

    @include config.between('sm-column-break', 'lg-page-break') {
      justify-content: flex-end;
    }
  }

  .result-ratio-number {
    background-color: var(--status-result-bg, var(--bgcolor));
    border-radius: var(--border-radius);
    color: var(--status-result-fg, var(--fgcolor));
    padding: var(--shim-plus) var(--gutter) var(--gutter-plus);
  }

  .result-status {
    display: grid;
    gap: var(--gutter) var(--double-gutter);
    grid-area: status;
    grid-template-columns: 1fr 1fr;
    text-align: center;
  }

  .contrast-defined {
    @include config.below('lg-page-break') {
      display: none;
    }
  }
</style>
