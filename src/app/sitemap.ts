import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://agua-viva-landing.vercel.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacidade`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/termos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/obrigado`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.1 },
  ];
}
