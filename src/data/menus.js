const menus = {
  header: [
    {
      url: "/",
      copy: "Home",
    },
    {
      url: "/contact/",
      copy: "Contact",
    },
  ],
}
/**
 * Remove trailing slash to improve comparison.
 * @param {string} url
 * @returns {string} Return url without trailing slash.
 */
const normalizeUrl = (url) => url ? url.replace(/\/+$/, '') : url;

/**
 * Recursively adds an `active` property to each menu item based on whether its `url`
 * matches the provided `activeUrl`. Processes nested `items` arrays recursively.
 *
 * @param {Array} items - The array of menu items to process.
 * @param {string} activeUrl - The URL to match against each item's `url` to determine `active` state..
 * @returns {Array} - A new array of menu items with an added `active` property (boolean).
 */
const contextualize = (items, activeUrl) => {
  return items.map(i => ({
    ...i,
    active: normalizeUrl(activeUrl) === normalizeUrl(i.url),
    items: i.items ? contextualize(i.items, activeUrl) : undefined
  }));
};

/**
 * Retrieves a menu configuration based on the given location and active URL.
 *
 * This function searches for a menu in the predefined `menus` collection.
 * If no menu is found for the specified location, it attempts to use a default menu.
 * If neither is found, it returns an empty array and logs an error.
 *
 * @param {string} location - The location identifier used to find the menu.
 * @param {string} activeUrl - The currently active URL, used to filter or contextualize menu data (Astro.url.pathname).
 * @returns {Array|Object} Resolves with the menu items array if found;
 * otherwise, it may return a menu object or an empty array.
 */
export function getMenu(location, activeUrl = undefined){
  let items = []
  if(menus[location]) {
   items = menus[location]
  } else {
    throw new Error(`TND Custom Error: No menu with key '${location}'`);
  }
  if(!items.length) {
    throw new Error(`TND Custom Error: Menu with key '${location}' location has no items.`);
  }
  return activeUrl ? contextualize(items, activeUrl) : items
}