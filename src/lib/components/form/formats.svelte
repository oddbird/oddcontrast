<script lang="ts">
  export let type: 'bg' | 'fg';

  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
</script>

<div data-content="formats">
  <!-- h3 and swatch will be hidden on wide screens -->
  <h3 class="small">{displayType} Color in Additional Formats</h3>
  <div class="swatch {type}" />
  <p>List with other color formats</p>
</div>

<style lang="scss">
  @use '../../../sass/config';

  .swatch {
    @include config.square('swatch');
    border: var(--border-width) solid var(--text);

    &.bg {
      background-color: var(--bgcolor);
    }

    &.fg {
      background-color: var(--fgcolor);
    }
  }
</style>
