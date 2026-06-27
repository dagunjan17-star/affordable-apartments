import React from "react";
import BlogList from "./BlogList";

export const metadata = {
  title: "Gurgaon Apartment Blogs | Buying Guide & Investment Tips",

  description:
    "Explore expert blogs on affordable apartments in Gurgaon, including buying tips, investment strategies, legal guidance and latest real estate trends.",

  keywords: [
    "apartments in gurgaon",
    "affordable apartments gurgaon",
    "property buying guide gurgaon",
    "real estate investment gurgaon",
    "flat buying tips",
    "gurgaon property blogs",
  ],

  alternates: {
    canonical: "https://www.affordableapartmentsingurgaon.com/blog", // 👉 apna domain daal dena
  },

  openGraph: {
    title: "Gurgaon Apartment Blogs & Real Estate Insights",
    description:
      "Read expert insights, buying guides and investment tips for apartments in Gurgaon.",
    url: "https://www.affordableapartmentsingurgaon.com/blog",
    siteName: "yourdomain.com",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gurgaon Apartment Blogs & Buying Guide",
    description:
      "Latest real estate blogs, tips and investment insights for Gurgaon apartments.",
  },
};

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8]">
      <BlogList />

      {/* SEO BOOST */}
      <div className="hidden">
        Affordable apartments in Gurgaon, 1BHK 2BHK 3BHK flats, property buying tips, investment guide Gurgaon real estate.
      </div>
    </div>
  );
};

export default Page;