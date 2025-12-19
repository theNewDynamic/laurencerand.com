
import site from "@data/site";

import getStructuredData from "./getStructuredData";
import getMetasData from "./getMetasData";
import getData from "./getData";

const escapeString = (string) => {
  if(/[*_\"]/.test(string)) {
    return string.replace('"', '&quot;').replace(/[*_]/g, '');
  }
  return string
}

const absUrl = (url) => {
  if(typeof url == "undefined"){
    return false
  }
  const separator = url.charAt(0) != "/" ? "/" : ""
  const { url: baseURL } = site
  return baseURL + separator + url
}

const isHome = (entry) => {
  return typeof entry.home !== "undefined" && entry.home
}

export { getMetasData, getStructuredData, getData, escapeString, absUrl, isHome }