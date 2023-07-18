import type { ColorFormatId } from '$lib/constants';

export const getSpaceFromFormatId = (formatId: ColorFormatId) =>
  formatId === 'hex' ? 'srgb' : formatId;
