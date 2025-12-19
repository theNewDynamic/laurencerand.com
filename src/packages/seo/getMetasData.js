import { getData } from "."

/**
 * Structure the seo data for Astro SEO Plugin.
 * @param {*} entry
 * @returns The object expected by the Astro SEO plugin > https://github.com/jonasmerlin/astro-seo?tab=readme-ov-file#supported-props
 */
const getMetasData = async (entry) => {
  const {
    title,
    description,
    canonical,
    noindex,
    nofollow,
    charset,
    ogTitle,
    type,
    authors,
    publishedTime,
    modifiedTime,
    image,
    imageAlt,
    url,
    locale,
    localeAlternate,
    languageAlternates,
    siteTitle,
    twitterCard,
    twitterHandle,
    twitterCreatorHandle
  } = await getData(entry)


  return {
    title,
    description,
    canonical,
    noindex,
    nofollow,
    charset,
    languageAlternates,
    openGraph: {
      basic: {
        title: ogTitle,
        type,
        image,
        url,
      },
      optional: {
        locale,
        localeAlternate,
        description,
        siteName: siteTitle,
      },
      image: {
        alt: imageAlt
      },
      ...(type == "article" ? {
        publishedTime,
        modifiedTime,
        authors: authors.map(a => a.name),
      } : {}),
    },
    twitter: {
      description,
      card: twitterCard,
      site: twitterHandle && ('@' + twitterHandle),
      creator: twitterHandle && ('@' + twitterCreatorHandle)
    }
   }
}

export default getMetasData