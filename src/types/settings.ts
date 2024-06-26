import type { ColorPreset, Contrast, PaletteMode } from 'src/theme'

export type Layout = 'horizontal' | 'vertical'

export type NavColor = 'blend-in' | 'discrete' | 'evident'

export interface Settings {
  colorPreset?: ColorPreset
  contrast?: Contrast
  layout?: Layout
  navColor?: NavColor
  paletteMode?: PaletteMode
  responsiveFontSizes?: boolean
  stretch?: boolean
}
