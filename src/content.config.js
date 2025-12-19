import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string().optional(),
    image: image().optional(),
    description: z.string().optional(),
    footer_copy: z.string().optional(),
    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional()
  })
});

export const collections = { pages }