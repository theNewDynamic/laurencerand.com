// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import fonts from './astro.config.fonts.mjs';
import tndOps from '@thenewdynamic/astro-tnd-ops';
// https://astro.build/config
export default defineConfig({
    integrations: [tndOps()],
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
