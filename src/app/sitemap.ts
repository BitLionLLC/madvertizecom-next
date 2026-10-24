import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = ["", "/services", "/work", "/pricing", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
