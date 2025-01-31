<script lang="ts">
  import ExternalLink from '$lib/components/util/ExternalLink.svelte';
</script>

<hr />
<div class="known-issues">
  <h2 class="section-heading">Known Color Issues</h2>
  <ul class="issues-list">
    <li>
      <h3 class="list-item-heading">Gamut Mapping Implementation</h3>
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
      <h3 class="list-item-heading">Checking for Out of Gamut Colors</h3>
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
  </ul>
</div>

<style lang="scss">
  hr {
    border: unset;
    border-block-start: var(--border-width) solid var(--border-light);
    margin-block-end: var(--spacer);
    margin-inline: unset;
  }

  .known-issues {
    margin-block-end: var(--spacer);
  }

  .issues-list {
    margin-block-start: var(--gutter);
    max-inline-size: 85ch;
  }

  p {
    margin-block-end: var(--gutter);
  }
</style>
