import { defineConfig } from 'unocss'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  content: {
    // filesystem: ['**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}'],
  },
  shortcuts: {},
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerDirectives()],
})
