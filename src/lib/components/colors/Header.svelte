<script lang="ts">
  import { inGamut, type PlainColorObject, serialize, to } from 'colorjs.io/fn';
  import { type Writable } from 'svelte/store';

  import CopyButton from '$lib/components/util/CopyButton.svelte';
  import Icon from '$lib/components/util/Icon.svelte';
  import { type ColorFormatId, GAMUTS } from '$lib/constants';
  import { gamut, switchColors } from '$lib/stores';
  import { getSpaceFromFormatId } from '$lib/utils';

  interface Props {
    type: 'bg' | 'fg';
    color: Writable<PlainColorObject>;
    format: ColorFormatId;
  }

  const CUSTOM_MIMETYPE = 'text/odd';

  let { type, color, format }: Props = $props();

  let targetSpace = $derived(getSpaceFromFormatId(format));
  let display = $derived(serialize($color, { inGamut: false, format }));
  let displayType = $derived(type === 'bg' ? 'Background' : 'Foreground');
  let colorInGamut = $derived($gamut ? inGamut($color, $gamut) : true);
  let gamutName = $derived(
    $gamut ? (GAMUTS.find((g) => g.format === $gamut)?.name ?? null) : null,
  );
  let editing = $state(false);
  let inputValue = $state('');
  let hasError = $state(false);
  let isDragging = false;

  // When not editing, sync input value with color (e.g. when sliders change)
  $effect(() => {
    if (!editing) {
      inputValue = display;
    }
  });

  const handleFocus = () => {
    editing = true;
  };

  const handleBlur = () => {
    editing = false;
    hasError = false;
  };

  // Update color (but not color space) when input changes
  const handleInput = function (this: HTMLInputElement) {
    const { value } = this;
    inputValue = value;
    editing = true;
    hasError = false;
    if (display !== value) {
      let newColor;
      try {
        newColor = to(value, targetSpace, { inGamut: true });
      } catch (error) {
        try {
          // If it's possibly hex without a hash, add a hash and try again.
          if ([3, 4, 6, 8].includes(value.length)) {
            newColor = to(`#${value}`, targetSpace, { inGamut: true });
          } else {
            throw error;
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (errorWithHash) {
          hasError = true;
          // Log original error
          console.error(error);
        }
      }
      if (newColor) {
        $color = newColor;
      }
    }
  };

  const handleKeydown = function (
    this: HTMLInputElement,
    event: KeyboardEvent,
  ) {
    switch (event.key) {
      case 'Enter':
      case 'Esc':
      case 'Escape':
        this.blur();
        break;
    }
  };

  const onDragStart = (event: DragEvent) => {
    isDragging = true;
    if (!event.dataTransfer) return;
    event.dataTransfer.clearData();
    event.dataTransfer.setData(CUSTOM_MIMETYPE, type);
  };

  const onDrop = (event: DragEvent | undefined) => {
    const droppedType = event?.dataTransfer?.getData(CUSTOM_MIMETYPE);
    const dragIsFromOther =
      type === 'fg' ? droppedType === 'bg' : droppedType === 'fg';
    if (dragIsFromOther) {
      switchColors();
    }
  };

  const makeDropable = (event: DragEvent) => {
    // DataTransfer values are not available on dragover, but because the types
    // of items is available, we can use a custom mimetype to check if a swatch
    // is the drag target.
    if (!isDragging && event?.dataTransfer?.types.includes(CUSTOM_MIMETYPE)) {
      // Cancelling the event signals that the dragged item can be dropped here.
      event.preventDefault();
    }
  };
</script>

<div
  data-group="header {type}"
  data-colors="preview"
  data-column="tool"
  data-needs-changes={hasError}
>
  <div
    role="complementary"
    class="swatch {type} {colorInGamut ? 'in-gamut' : 'out-of-gamut'}"
    draggable="true"
    ondrop={onDrop}
    ondragenter={makeDropable}
    ondragover={makeDropable}
    ondragstart={onDragStart}
    ondragend={() => (isDragging = false)}
  >
    {#if !colorInGamut}
      <div class="gamut-warning">
        <Icon name="warning" />
        <span>Out of {gamutName ? `${gamutName} ` : ''}gamut</span>
      </div>
    {/if}
  </div>
  <label for="{type}-color" data-label>
    {displayType} Color
  </label>
  <input
    id="{type}-color"
    name="{type}-color"
    type="text"
    data-input="color"
    value={inputValue}
    onfocus={handleFocus}
    onblur={handleBlur}
    oninput={handleInput}
    onkeydown={handleKeydown}
  />
  <CopyButton text={display} size="medium" />
  {#if hasError}
    <div data-color-info="warning">Could not parse input as a valid color.</div>
  {/if}
</div>

<style lang="scss">
  @use 'config';

  [data-colors] {
    align-items: center;
    display: grid;
    grid-template:
      'label label' auto
      'swatch swatch' var(--swatch-height, var(--swatch))
      'copy input' auto
      '.... error' minmax(var(--double-gutter), auto) / auto 1fr;

    @include config.above('sm-page-break') {
      --swatch-height: calc(2 * var(--swatch));
    }
  }

  .swatch {
    block-size: 100%;
    border: var(--border-width) solid var(--border);
    border-radius: var(--border-radius);
    forced-color-adjust: none;
    grid-area: swatch;
    position: relative;
    &.out-of-gamut {
      outline: var(--warning) 3pt solid;
      outline-offset: 1pt;
    }

    .gamut-warning {
      @include config.z-index('bump');

      background: var(--warning);
      border-radius: var(--border-radius);
      color: var(--bg);
      display: flex;
      font-size: var(--small);
      gap: var(--half-shim);
      margin: var(--shim) 0 0 var(--shim);
      outline: var(--border-width) solid var(--bg);
      padding: var(--half-shim) var(--shim);
      position: absolute;
    }

    &.bg {
      &:after {
        background-color: var(--bgcolor);
      }
    }

    &.fg {
      &:after {
        background-color: var(--fgcolor);
      }
    }

    // helps with minor gap showing in some browsers
    &:after {
      border-radius: calc(var(--border-radius) - 1px);
    }

    &:before,
    &:after {
      block-size: 100%;
      content: '';
      display: block;
      inline-size: var(--checkerboard-width, 100%);
      inset-inline-start: var(--checkerboard-start, 0);
      position: absolute;
    }

    &:before {
      --checkerboard-start: 50%;
      --checkerboard-width: 50%;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><rect fill="%23e8e8e8" width="30" height="30"/><rect x="30" y="30" width="30" height="30" fill="%23e8e8e8"/></svg>');
      background-position: 0 0;
      background-size: 30px 30px;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      z-index: -1;
    }
  }

  [data-input='color'] {
    grid-area: input;
  }

  [data-color-info='warning'] {
    grid-area: error;
  }

  [data-label] {
    --label-margin-block-end: var(--half-shim);
    grid-area: label;
  }

  [data-group] {
    margin-block-end: var(--gutter-plus);
  }
</style>
