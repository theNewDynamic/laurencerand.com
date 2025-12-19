export const parseBase = (data) => {
  const {
    description,
    date,
    ogTitle,
    type,
    publishedTime,
    modifiedTime,
    image,
    authors,
    url,
  } = data

  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: ogTitle,
    url,
    image: [image],
    description,
    ...(!!authors && !!authors.length ? {author: authors.map(({name,url})=>({
      "@type": "Person",
      name,
      url
    }))} : {}),
    datePublished: date,
    ...(type == "article" ? {
      datePublished: publishedTime,
      dateModified: modifiedTime
    } : {}),

  }
}

export const parseVenue = (data) => {
  // Data is expecting the venue here, not the whole page entry
  const {
    title,
    address_1: address,
    address_2: address2,
    city,
    country,
    state,
    phone,
    zip,
  } = data
  return {
    "@type": "Place",
    name: title,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      postalCode: zip,
      addressRegion: state,
      addressCountry: country
    }
  }
}

export const parseEvent = (data) => {
  const {
    timeStart,
    timeEnd,
    venue,
  } = data
  return {
    "@type": "Event",
    startDate: timeStart,
    endDate: timeEnd,
    ...(!!venue ? {location: parseVenue(venue)} : {}),
    /* For consideration.
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",

    performer: {
      "@type": "PerformingGroup",
      name: "Kira and Morrison"
    },
    organizer: {
      "@type": "Organization",
      name: "Kira and Morrison Music",
      url: "https://kiraandmorrisonmusic.com"
    }
    */
  }
}