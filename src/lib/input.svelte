<script>
  let color1a = 195;
  let color1b = 52;
  let color1c = 31;
  let color2a = 195;
  let color2b = 0;
  let color2c = 100;
</script>

<div data-layout="color-tools">
  <form data-form="contrast-checker" data-layout="split">
    <div data-field="color" data-group="input bg">
      <label for="background-color" data-label>Background Color</label>
      <input
        name="background-color"
        type="text"
        value="hsl({color1a} {color1b} {color1c})"
        readonly
      />
    </div>
    <!-- Form Field Errors -->

    <div data-actions="edit-color" data-group="sliders bg">
      <div data-field="color-slider">
        <label for="color1a" data-label>Hue (or Lightness, R, etc)</label>
        <input
          name="color1a"
          type="range"
          bind:value={color1a}
          min="0"
          max="360"
        />
      </div>
      <div data-field="color-slider">
        <label for="color1b" data-label>Saturation (or A, G, etc)</label>
        <input name="color1b" type="range" bind:value={color1b} />
      </div>
      <div data-field="color-slider">
        <label for="color1c" data-label>Lightness (or L, B, etc)</label>
        <input name="color1c" type="range" bind:value={color1c} />
      </div>
    </div>

    <div data-field="color" data-group="input fg">
      <label for="foreground-color" data-label>Foreground Color</label>
      <input
        name="foreground-color"
        type="text"
        value="hsl({color2a} {color2b} {color2c})"
        readonly
      />
      <!-- Form Field Errors here -->
    </div>

    <div data-actions="edit-color" data-group="sliders fg">
      <div data-field="color-slider">
        <label for="color2a" data-label>Hue (or Lightness, R, etc)</label>
        <input
          name="color2a"
          type="range"
          bind:value={color2a}
          min="0"
          max="360"
        />
      </div>
      <div data-field="color-slider">
        <label for="color2b" data-label>Saturation (or A, G, etc)</label>
        <input name="color2b" type="range" bind:value={color2b} />
      </div>
      <div data-field="color-slider">
        <label for="color2c" data-label>Lightness (or L, B, etc)</label>
        <input name="color2c" type="range" bind:value={color2c} />
      </div>
    </div>
  </form>

  <div data-layout="split">
    <div data-content="formats">
      <!-- h3 and swatch will be hidden on wide screens -->
      <h3 class="small">Background Color in Additional Formats</h3>
      <!-- @todo This style should also be applied to data-layout=header -->
      <div
        class="swatch"
        style="--bgcolor: hsl({color1a}deg {color1b}% {color1c}%); --fgcolor: hsl({color2a}deg {color2b}% {color2c}%);"
      />
      <p>List with other color formats</p>
    </div>

    <div data-content="formats">
      <!-- h3 and swatch will be hidden on wide screens -->
      <h3 class="small">Foreground Color in Additional Formats</h3>
      <div
        class="swatch"
        style="--bgcolor: hsl({color2a}deg {color2b}% {color2c}%);"
      />
      <p>List with other color formats</p>
    </div>
  </div>
</div>

<style lang="scss" scoped>
  .swatch {
    background-color: var(--bgcolor);
    border: var(--border-width) solid var(--text);
    color: var(--fgcolor);
    height: 50px;
    width: 50px;
  }

  [data-form~='contrast-checker'] {
    grid-auto-flow: dense;
  }
</style>
