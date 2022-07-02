<aside data-layout="results">
  <div class="contrast-info">
    <h2 data-heading="xlarge"><strong>Preview</strong> Text</h2>

    <p>
      WCAG 2.0 level AA requires a contrast ratio of at least 4.5:1 for normal
      text and 3:1 for large text. WCAG level AAA requires a contrast ratio of
      at least 7:1 for normal text and 4.5:1 for large text. Large text is
      defined as 14 point (typically 18.66px) or larger for bold weight, or 18
      pt/24 px or larger for regular weight. The sliders can be used to adjust
      the selected color.
    </p>
  </div>

  <div class="result-group">
    <h3 class="result-ratio">
      <span class="sr-only">The contrast ratio is</span> 12.72:1
    </h3>
    Result boxes here
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
