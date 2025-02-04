<script lang="ts">
  import { contrast, mix } from 'colorjs.io/fn';

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
    if ($fg.alpha !== 1)
      return 'This ratio is our best estimate given the specified foreground alpha value.';
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
      <div class="result-warning-info">
        <p data-color-info="warning" class="result-warning">
          <Icon name="warning" />{alphaWarning}
        </p>
      </div>
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
</aside>

<style lang="scss">
  @use 'config';

  [data-layout='results'] {
    background: linear-gradient(90deg, var(--bgcolor), var(--bgcolor)),
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect fill="%23e8e8e8" width="30" height="30"/><rect x="30" y="30" width="30" height="30" fill="%23e8e8e8"/></svg>');
    background-size: 30px 30px;
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
    column-gap: var(--shim);
    display: grid;
    grid-area: contrastinfo;
    grid-template:
      'heading heading' min-content
      'number warning' min-content / auto 1fr;
    margin-block-end: var(--contrast-info-block-end, var(--gutter));

    @include config.between('sm-page-break', 'lg-page-break') {
      --contrast-info-block-end: 0;

      gap: var(--shim) var(--gutter);
      // fixed width column to prevent layout shift as the ratio number changes
      grid-template:
        'heading heading' min-content
        'number warning' min-content
        'intro intro' auto / auto 1fr;
    }

    @include config.above('lg-page-break') {
      gap: var(--shim);
      grid-template:
        'heading heading' auto
        'intro intro' auto
        'number warning' min-content / 1fr auto;
    }
  }

  [data-heading] {
    grid-area: heading;
  }

  .result-intro {
    grid-area: intro;
    margin-block: var(--gutter);

    @include config.below('sm-page-break') {
      display: none;
    }

    :global(a) {
      --link: var(--fgcolor);
      --link-focus: var(--fgcolor);
    }
  }

  .result-ratio {
    align-items: center;
    display: inline-flex;
    grid-area: number;
    line-height: 0.7; // weird number alignment

    @include config.between('sm-column-break', 'lg-page-break') {
      justify-content: flex-end;
    }
  }

  .result-warning-info {
    align-items: center;
    display: flex;
    grid-area: warning;
  }

  .result-warning {
    --warning-bg: var(--bg);
    --warning-padding-block: var(--shim);
    --warning-padding-inline: var(--shim);
    --warning-size: var(--small);
    border: var(--border-width) solid var(--border);
    border-radius: var(--border-radius);
    display: flex;
    gap: var(--half-shim);
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

    @include config.between('sm-page-break', 'lg-page-break') {
      grid-template-rows: min-content;
      padding-block-start: var(--shim-plus);
    }
  }

  .contrast-defined {
    @include config.below('lg-page-break') {
      display: none;
    }
  }
</style>
