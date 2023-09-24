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
  theme: {
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '1024px',
      lg: '1280px',
      xl: '1536px',
      xxl: '1920px',
    },
    colors: {
      'bg-white02': 'rgb(var(--error-color-active),0.2)',
    },
  },
  rules: [],
})
