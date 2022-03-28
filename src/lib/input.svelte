<script>
  import { bg, bg_h, bg_s, bg_l, fg, fg_h, fg_s, fg_l } from '../stores';
</script>

<div data-layout="color-tools">
  <form data-form="contrast-checker" data-layout="split">
    <div data-field="color" data-group="input bg">
      <label for="background-color" data-label>Background Color</label>
      <input name="background-color" type="text" value={$bg} readonly />
    </div>
    <!-- Form Field Errors -->

    <div data-actions="edit-color" data-group="sliders bg">
      <div data-field="color-slider">
        <label for="bg_h" data-label>Hue (or Lightness, R, etc)</label>
        <input name="bg_h" type="range" bind:value={$bg_h} min="0" max="360" />
      </div>
      <div data-field="color-slider">
        <label for="bg_s" data-label>Saturation (or A, G, etc)</label>
        <input name="bg_s" type="range" bind:value={$bg_s} />
      </div>
      <div data-field="color-slider">
        <label for="bg_l" data-label>Lightness (or L, B, etc)</label>
        <input name="bg_l" type="range" bind:value={$bg_l} />
      </div>
    </div>

    <div data-field="color" data-group="input fg">
      <label for="foreground-color" data-label>Foreground Color</label>
      <input name="foreground-color" type="text" value={$fg} readonly />
      <!-- Form Field Errors here -->
    </div>

    <div data-actions="edit-color" data-group="sliders fg">
      <div data-field="color-slider">
        <label for="fg_h" data-label>Hue (or Lightness, R, etc)</label>
        <input name="fg_h" type="range" bind:value={$fg_h} min="0" max="360" />
      </div>
      <div data-field="color-slider">
        <label for="fg_s" data-label>Saturation (or A, G, etc)</label>
        <input name="fg_s" type="range" bind:value={$fg_s} />
      </div>
      <div data-field="color-slider">
        <label for="fg_l" data-label>Lightness (or L, B, etc)</label>
        <input name="fg_l" type="range" bind:value={$fg_l} />
      </div>
    </div>
  </form>

  <div data-layout="split">
    <div data-content="formats">
      <!-- h3 and swatch will be hidden on wide screens -->
      <h3 class="small">Background Color in Additional Formats</h3>
      <div class="swatch" style="--swatch-color: {$bg};" />
      <p>List with other color formats</p>
    </div>

    <div data-content="formats">
      <!-- h3 and swatch will be hidden on wide screens -->
      <h3 class="small">Foreground Color in Additional Formats</h3>
      <div class="swatch" style="--swatch-color: {$fg};" />
      <p>List with other color formats</p>
    </div>
  </div>
</div>

<style lang="scss" scoped>
  .swatch {
    background-color: var(--swatch-color);
    border: var(--border-width) solid var(--text);
    height: 50px;
    width: 50px;
  }

  [data-form~='contrast-checker'] {
    grid-auto-flow: dense;
  }
</style>
