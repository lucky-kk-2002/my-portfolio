declare module 'colorthief' {
  export type RGBColor = [number, number, number];
  export function getColorSync(img: HTMLImageElement, quality?: number): RGBColor;
  export function getColor(img: HTMLImageElement, quality?: number): Promise<RGBColor>;
  export function getPaletteSync(img: HTMLImageElement, colorCount?: number, quality?: number): RGBColor[];
  export function getPalette(img: HTMLImageElement, colorCount?: number, quality?: number): Promise<RGBColor[]>;
}