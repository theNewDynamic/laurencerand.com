// @ts-check
import { defineConfig, envField } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import fonts from './astro.config.fonts.mjs';
import tndOps from '@thenewdynamic/astro-tnd-ops';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';
// https://astro.build/config
export default defineConfig({
    site: 'https://www.laurencerand.com',
    integrations: [tndOps(), sitemap()],
    session: false,
    // The adapter's Vite plugin starts its own server, which Vitest can't share.
    adapter: process.env.VITEST ? undefined : cloudflare({
      imageService: 'compile', // local images: optimize at build time, as before
      prerenderEnvironment: 'node',
    }),
    fonts,
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