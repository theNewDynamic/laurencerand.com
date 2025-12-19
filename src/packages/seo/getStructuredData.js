import { getData } from "."
import { parseEvent, parseBase } from "./sd"

/**
 *
 * @param {*} entry
 * @returns The structured data as per the https://schema.org specifications.
 */
const getStructuredData = async (entry) => {
  /** We retrieve entry's processed SEO data */
  const data = await getData(entry)
  /** We apply the logic common to all entry types. */
  let output = parseBase(data)
  /** Even sporting its own logic and transformer. */
  if(data._type == "event") {
    output = {
      ...output,
      ...parseEvent(data)
    }
  }

  return output
}
export default getStructuredData