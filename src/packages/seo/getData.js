import { getImage } from 'astro:assets';
import { isHome, absUrl, escapeString } from "."
import getCustomData from "./getCustomData";
import site from "@data/site.js";
import { getEntry } from 'astro:content';
import defaultImage from '../../content/photo-2026.jpeg'
/**
 * Retrieves and processes data for a given entry to format for SEO and metadata purposes.
 * @param {Object} entry - The entry object containing data to be processed.
 * @returns {Object} - Formatted data including metadata for SEO.
 * @property {string} _type - The type of the entry as stored in Sanity.
 * @property {string} title - The title of the entry, possibly combined with the site title.
 * @property {string} publishedTime - The published time of the entry.
 * @property {string} modifiedTime - The last modified time of the entry.
 * @property {Array<Object>} authors - An array of objects representing authors of the entry, each containing a name and URL.
 * @property {string | Array<object>} description - The description of the entry, can be in Portable Text.
 * @property {string} descriptionText - The description of the entry in text form.
 * @property {string} canonical - The canonical URL of the entry.
 * @property {boolean} noindex - Indicates whether the entry should be indexed by search engines.
 * @property {boolean} nofollow - Indicates whether links within the entry should be followed by search engines.
 * @property {string} charset - The character encoding of the entry.
 * @property {string} ogTitle - The Open Graph title of the entry.
 * @property {string} type - The type of the entry, "article" or "website" etc..
 * @property {string} image - The URL of the image associated with the entry.
 * @property {string} imageAlt - The alternative text for the image associated with the entry.
 * @property {string} url - The URL of the entry.
 * @property {string} locale - The locale of the entry, defaults to 'en_US'.
 * @property {Array<string>} localeAlternate - An array of alternate locales for the entry.
 * @property {Array<Object>} languageAlternates - An array of objects representing alternate languages for the entry, each containing a href and hrefLang.
 * @property {string} siteTitle - The title of the website.
 * @property {string} twitterCard - The type of Twitter card to be used for the entry.
 * @property {string} twitterHandle - The Twitter handle associated with the entry.
 * @property {string} twitterCreatorHandle - The Twitter handle of the creator of the entry.
 * @property {string} venue - The venue associated with the entry (specific to events).
 * @property {string} timeStart - The start time of the event (specific to events).
 * @property {string} timeEnd - The end time of the event (specific to events).
 */
const getData = async (entry) => {
  const baseURL = site.url
  /** We destructure the site object to register some variables, using aliases to understand where they're from.
   * Here site.title will be stored in `siteTitle` for ex.
   */

  const defaultEntry = await getEntry('pages', 'index')

  const { title: siteTitle, description: siteDescription, seo: {title: seoSiteTitle = site.title, twitterHandle: siteTwitterHandle } = {} } = site
  let {
    title = "Missing",
    type = "website",
    _type,
    _updatedAt,
    time_start,
    time_end,
    venue,
    date,
    url,
    description,
    descriptionText,
    locale = 'en_US',
    image,
    authors = [],
    bodyText,
    translation,
    twitterCard = "summary_large_image",
    twitterHandle = siteTwitterHandle,
    twitterCreatorHandle = siteTwitterHandle,
  } = entry


  const seo = entry.seo || {}

  /** We destructure the entry.seo (CMS SEO Field) object to register some variables, using aliases to understand where they're from.
   * Here seo.title will be stored in `seoTitle` for ex.
   */
  const {
    title: seoTitle,
    description: seoDescription,
    image: seoImage,
    canonical: seoCanonical,
    private: seoPrivate = false,
  } = seo

  /** Type meta should always be website unless on blog posts */
  type = _type == "post" ? "article" : "website"

  /** We turn the relative input url into an absolute one */
  url = url && absUrl(url)

  /** The indexability of the entry is inferred from seoPrivate then the site's environment. */
  const isPrivate = seoPrivate || !site.prod()

  /** The canonical URL is inferred frmo seoCanonical, then the entry's URL. */
  const canonical = seoCanonical || url

  /** The Title tag is inferred from seoTitle, then the escaped entry's title, then siteTitle */
  title = seoTitle ? seoTitle :
          title ? escapeString(title) :
          siteTitle

  /** The Description tag is inferred with seoDescription, then the escaped descriptionText, then escaped description, then an exerpt of bodyText, then the siteDescription */
  description = seoDescription ? seoDescription :
                descriptionText ? escapeString(descriptionText) :
                description && typeof description == "string" ? escapeString(description) :
                siteDescription


  /** Here infer the ogTitle with the entry's title */
  let ogTitle = title

  /** If not the homepage we can append the siteTitle to the entry's title to create the title meta tag. */
  if(siteTitle && !isHome(entry)) {
    title = `${title} | ${siteTitle}`
  } else if(isHome(entry)){
  /** If on the homepage, title and og:title will be the site's title. */
    title = site.title
    ogTitle = site.title
  }
  //let siteImage = defaultEntry.image || ""

  /** The image is inferred, with seoImage taking precedence, followed by the entry's own image and finally the siteImage */
  image = seoImage || image || defaultImage

  /** imageAlt defaults to an empty string */
  let imageAlt = ''

  /** Image is will be processed to return its URL */
  if(image) {
    /** If the image is an object, we assume it's a Sanity image and process it.
     * Before overwriting the image with its SRC, we look for an alternative text.
     **/
    imageAlt = image && image.altText ? image.altText : imageAlt
    const imageObject = await getImage({src: image, format: 'avif', width: 1000})
    if(imageObject) {
      image = imageObject.src
    }
  }

  /** In a multilingual context, we'll look for the translation object on the entry
   * to generate the localeAlternate
   */
  const languageAlternates = translation && [{
    href: translation.url,
    hrefLang: translation.lang
  }]
  const localeAlternate = translation && [translation.lang]

  /** We're ready to return an object with SEO information for this entry. */
  let output = {
    _type,
    title,
    publishedTime: date,
    modifiedTime: _updatedAt,
    authors: (authors && authors.length) ? authors.map(a => ({name: a.title, url: absUrl(a.url)})) : [],
    description,
    canonical,
    noindex: isPrivate,
    nofollow: isPrivate,
    charset: 'UTF-8',
    ogTitle,
    type,
    image,
    imageAlt,
    url,
    locale,
    localeAlternate,
    languageAlternates,
    siteTitle,
    twitterCard,
    twitterHandle,
    twitterCreatorHandle,
    // For Events
    venue,
    timeStart: time_start,
    timeEnd: time_end,
  }

  /** the getCustomData function is used to overwrite logic with project's own. */
  output = {
    ...output,
    ...getCustomData(entry)
  }
  return output
}

export default getData