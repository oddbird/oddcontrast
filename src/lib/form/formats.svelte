<script lang="ts">
  export let type: 'bg' | 'fg';
  export let value: string;

  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
</script>

<div data-content="formats">
  <!-- h3 and swatch will be hidden on wide screens -->
  <h3 class="small">{displayType} Color in Additional Formats</h3>
  <div class="swatch" style="--swatch-color: {value};" />
  <p>List with other color formats</p>
</div>

<style lang="scss" scoped>
  .swatch {
    background-color: var(--swatch-color);
    border: var(--border-width) solid var(--text);
    height: 50px;
    width: 50px;
  }
</style>
