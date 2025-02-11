<script lang="ts">
  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
</script>

<hr />
<div class="known-issues">
  <h2 class="section-heading">Known Color Issues</h2>
  <ul class="issues-list">
    <li>
      <h3 data-list-item-heading>Gamut Mapping Implementation</h3>
      <p>
        Browsers implemented gamut mapping using clipping, which is fast but
        provides inferior results compared to the algorithm defined in the <ExternalLink
          href="https://drafts.csswg.org/css-color/#binsearch"
          >CSS Spec</ExternalLink
        >. Until browsers are updated, colors that are out of gamut for your
        screen may be displayed very differently than expected.
      </p>
    </li>
    <li>
      <h3 data-list-item-heading>Checking for Out of Gamut Colors</h3>
      <p>
        The new color features in CSS allow for a much wider range of colors,
        many of which cannot be shown on many (or any) screens. When selecting
        colors, consider that most users will see these colors on a display that
        supports the <code>sRGB</code> or <code>P3</code> gamut.
      </p>
      <p>There are two primary ways a color can be out of gamut:</p>
      <ol>
        <li>
          Choosing a color in a space with a wider gamut, especially when a
          channel is near one of the edges of its range.
        </li>
        <li>
          Specifying a channel value that is outside its range. While the
          sliders in this tool set hard boundaries, values outside these
          boundaries are still valid, and can be entered in the text input.
        </li>
      </ol>
      <p>
        When a color is out of gamut for the user's screen, the browser will
        adjust the color to be in gamut.
      </p>
    </li>
    <li>
      <h3 data-list-item-heading="target" id="background-alpha">
        Background Color Alpha Values
        <Icon name="warning" />
      </h3>
      <p>
        WCAG 2 contrast does not consider alpha values. Because we don't know
        what is behind your background color, we can't estimate the contrast. If
        the background color is not opaque, the contrast ratio is computed
        without background or foreground opacity.
      </p>
    </li>
    <li>
      <h3 data-list-item-heading="target" id="foreground-alpha">
        Foreground Color Alpha Values
        <Icon name="warning" />
      </h3>
      <p>
        WCAG 2 contrast does not consider alpha values, but we can approximate a
        ratio by premultiplying a semi-transparent foreground color in the sRGB
        space. In practice, the displayed foreground color may vary depending on
        the display and browser.
      </p>
    </li>
  </ul>
</div>

<style lang="scss">
  hr {
    border: unset;
    border-block-start: var(--border-width) solid var(--border-light);
    margin-block-end: var(--spacer);
    margin-inline: var(--double-gutter);
  }

  .known-issues {
    margin-block-end: var(--spacer);
  }

  .issues-list {
    margin-block-start: var(--gutter);
    max-inline-size: 85ch;

    :target {
      --target-icon-opacity: 1;

      color: var(--warning);
    }
  }

  p {
    margin-block-end: var(--gutter);
  }
</style>
