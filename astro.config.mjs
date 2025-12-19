// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import fonts from './astro.config.fonts.mjs';
// https://astro.build/config
export default defineConfig({
    experimental: {
      fonts
    },
    env: {
      schema: {
        ASTRO_ENV: envField.string({
          context: 'server',
          access: 'public',
          default: 'dev'
        })
      }
    },
    vite: {
    plugins: [tailwindcss()]
  }
});
