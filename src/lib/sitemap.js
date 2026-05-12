import axios from "axios";
import { locations } from "@/data/locations";

// 🔥 SLUG FUNCTION
const createSlug = (location) => {
  return location
    .replace(", Gurgaon", "")
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export async function generateSitemap() {
  const baseUrl = "https://www.affordableapartmentsingurgaon.com";

  // 🔹 Static URLs
  const staticUrls = `
    <url><loc>${baseUrl}/</loc></url>
    <url><loc>${baseUrl}/about</loc></url>
    <url><loc>${baseUrl}/contact</loc></url>
    <url><loc>${baseUrl}/blog</loc></url>
    <url><loc>${baseUrl}/how-it-works</loc></url>
    <url><loc>${baseUrl}/listing/1-bhk-affordable-apartments-in-gurgaon</loc></url>
    <url><loc>${baseUrl}/listing/2-bhk-affordable-apartments-in-gurgaon</loc></url>
    <url><loc>${baseUrl}/listing/3-bhk-affordable-apartments-in-gurgaon</loc></url>
    <url><loc>${baseUrl}/listing/4-bhk-affordable-apartments-in-gurgaon</loc></url>

  `;

  // 🔥 BLOG URLs
 let propertiesUrls = [];
  try {
   const res = await axios.get(
  `https://gurgaon-backend.onrender.com/api/listed-properties/slugforbuyhouse`,
  {
    params: {
      search: "apartments",
    listingType: "sale, rent ",
    propertyCategory: "residential",
    city: "Gurgaon",
    minPrice: 100000,     // ✅ 1 lakh
   maxPrice: 10000001,
    },
  }
);
    propertiesUrls = res?.data?.data?.map(
      (slug) => `
        <url>
          <loc>${baseUrl}/properties/${slug}</loc>
        </url>
      `
    );
  } catch (err) {
    console.error("Blog fetch error:", err);
  }

  // 🔥 LOCATION URLs (MAIN PART)
  const locationUrls = locations.map((loc) => {
    const slug = createSlug(loc);

    return `
      <url>
        <loc>${baseUrl}/affordable-house-in-${slug}-gurgaon</loc>
      </url>
    `;
  });

  // 🔹 Combine all
  const allUrls = [
    staticUrls,
    ...locationUrls,
    // ...propertiesUrls,
  ].join("\n");

  // 🔹 XML Output
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls}
</urlset>`;
}