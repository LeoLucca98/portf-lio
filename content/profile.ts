export const profile = {
  name: "Leonardo Lucca",
  fullName: "Leonardo Lucca Holanda",
  email: "leolucca1998@gmail.com",
  linkedin: "https://www.linkedin.com/in/leonardo-lucca-holanda/",
  /** Pending: GitHub address not informed yet. The link stays hidden while null. */
  github: null as string | null,
  cv: "/curriculo-leonardo-lucca.pdf",
  photo: "/images/leonardo-lucca.jpg",
  city: "Maceió",
  region: "AL",
  country: "BR",
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://leonardolucca.vercel.app").replace(/\/$/, "");
