// ============================================================
// WEDDING DATA CONFIGURATION
// Edit this file to customize the invitation for any couple
// ============================================================

export const weddingData = {
  couple: {
    bride: "Anna",
    groom: "Rohan",
    combined: "Anna & Rohan",
  },

  date: {
    day: "23",
    month: "July",
    monthNumeric: "07",
    year: "2026",
    full: "July 23, 2026",
    display: "23 July 2026",
    // Target date for countdown (ISO format)
    target: "2026-07-23T17:00:00",
  },

  ceremony: {
    time: "5:00 PM",
    venue: "St. Mary's Church",
    address: "Church Street, Mangaluru",
    mapsUrl: "https://maps.google.com/?q=St+Mary%27s+Church+Mangaluru",
  },

  reception: {
    time: "7:00 PM",
    venue: "Grand Palace",
    address: "Palace Road, Mangaluru",
    mapsUrl: "https://maps.google.com/?q=Grand+Palace+Mangaluru",
  },

  venue: {
    name: "St. Mary's Church",
    city: "Mangaluru",
    state: "Karnataka",
    country: "India",
    directionsUrl: "https://maps.google.com/?q=St+Mary%27s+Church+Mangaluru",
  },

  story: [
    {
      year: "2022",
      title: "We Met",
      description:
        "A chance encounter that changed everything. Two strangers became the best of friends.",
      photo: null, // Replace with image path when available
    },
    {
      year: "2023",
      title: "Our First Date",
      description:
        "Over candlelight and soft music, we knew this was the beginning of forever.",
      photo: null,
    },
    {
      year: "2025",
      title: "The Proposal",
      description:
        "Under a sky full of stars, he got down on one knee and asked the question.",
      photo: null,
    },
    {
      year: "2026",
      title: "The Wedding",
      description:
        "And now we invite you to celebrate as we begin our greatest adventure.",
      photo: null,
    },
  ],

  gallery: [
    { id: 1, src: null, alt: "Couple portrait", rotation: -3, zIndex: 4 },
    { id: 2, src: null, alt: "Together moment", rotation: 2, zIndex: 3 },
    { id: 3, src: null, alt: "Candid laugh", rotation: -1.5, zIndex: 2 },
    { id: 4, src: null, alt: "Golden hour", rotation: 3.5, zIndex: 1 },
  ],

  rsvp: {
    // Set to a real endpoint (Formspree, EmailJS, etc.) when ready
    endpoint: null,
    deadline: "July 1, 2026",
  },

  music: {
    // Replace with actual audio file path or URL
    src: null,
    title: "Our Song",
  },

  meta: {
    title: "Anna & Rohan — Wedding Invitation",
    description:
      "You are invited to celebrate the wedding of Anna & Rohan on July 23, 2026 in Mangaluru.",
    ogImage: null,
  },
};

export default weddingData;
