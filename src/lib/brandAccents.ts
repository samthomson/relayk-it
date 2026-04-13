/** RelayKit lilac / lavender brand accents — deeper tones for visible contrast on light UI. */
export const BRAND_ACCENTS = [
  { base: 'rgba(148, 118, 198, 0.95)', glow: 'rgba(148, 118, 198, 0.58)' },
  { base: 'rgba(165, 138, 210, 0.95)', glow: 'rgba(165, 138, 210, 0.58)' },
  { base: 'rgba(128, 105, 195, 0.95)', glow: 'rgba(128, 105, 195, 0.58)' },
  { base: 'rgba(155, 128, 205, 0.95)', glow: 'rgba(155, 128, 205, 0.58)' },
  { base: 'rgba(115, 95, 185, 0.95)', glow: 'rgba(115, 95, 185, 0.58)' },
  { base: 'rgba(172, 152, 218, 0.95)', glow: 'rgba(172, 152, 218, 0.58)' },
  { base: 'rgba(138, 115, 200, 0.95)', glow: 'rgba(138, 115, 200, 0.58)' },
  { base: 'rgba(150, 122, 208, 0.95)', glow: 'rgba(150, 122, 208, 0.58)' },
] as const;

export function brandAccent(index: number) {
  return BRAND_ACCENTS[index % BRAND_ACCENTS.length];
}
