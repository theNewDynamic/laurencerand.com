// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import fonts from './astro.config.fonts.mjs';
// https://astro.build/config
export default defineConfig({
    experimental: {
      fonts
    },
    vite: {
    plugins: [tailwindcss()]
  }
});
