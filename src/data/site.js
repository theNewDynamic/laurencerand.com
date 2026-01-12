import { ASTRO_ENV } from 'astro:env/server'

export default {
  title: "Lauren Cerand",
  description: "Lauren Cerand is the founder and owner of Lauren Cerand Public Relations, and has been active in the field since 2001.",
  image: "./content/photo-2026.jpeg",
  gtmId: false,
  // If plausible ID/domain set it here.
  plausibleId: '',
  // This will display useful debug information in dev mode when appropriate.
  debugInfo: false,
  url: import.meta.env.SITE || 'https://www.laurencerand.com',
  env: ASTRO_ENV,
  seo: {
    title: "Lauren Cerand",
    twitterHandle: "twitter_handle"
  },
  prod: () => ASTRO_ENV == 'production',
}