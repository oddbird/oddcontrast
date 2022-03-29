<script lang="ts">
  export let type: 'bg' | 'fg';
  export let value: string;

  $: displayType = type === 'bg' ? 'Background' : 'Foreground';
</script>

<div data-field="color" data-group="input {type}">
  <label for="{type}-color" data-label>{displayType} Color</label>
  <input name="{type}-color" type="text" {value} readonly />
</div>
