import { getCollection } from "astro:content"

const _collections = {
  pages: await getCollection('pages')
}

// Apply the parse function to all collections
const collections = Object.fromEntries(
  Object.entries(_collections).map(([key, value]) => [key, value.map((e) => ({
    ...e,
    ...e.data, // Flatten the data directly here
    slug: e.data.slug || e.id
  }))])
);

export const pages = collections.pages.map(e => ({
  ...e,
  home: e.id == 'index' ? true : false,
}))