// app/properties/[slug]/page.js

import PropertyDetails from "./PropertyDetails";
import { notFound } from "next/navigation";

/* ================= FETCH PROPERTY ================= */

async function getPropertyBySlug(slug) {

  const res = await fetch(
    `https://deal-acres-backend.onrender.com/api/listed-properties/getPropertyBySlug/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const json = await res.json();

  return json?.data?.[0] || null;

}

/* ================= SEO ================= */

export async function generateMetadata({ params }) {

  const { slug } = await params;

  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Affordable Apartments in Gurgaon | Verified Listings",
      description:
        "Explore affordable apartments in Gurgaon with verified listings, best prices, and prime locations.",
    };
  }

  return {
    title: `${property.title} | Affordable Apartments in Gurgaon`,
    description:
      property.description?.[0] ||
      "View complete apartment details including price, location, photos and amenities in Gurgaon.",

    keywords: [
      "apartments in gurgaon",
      "affordable apartments gurgaon",
      property.locality,
      property.propertyType,
    ],

    alternates: {
      canonical: `https://www.dealacres.com/properties/${slug}`,
    },

    openGraph: {
      title: property.title,
      description:
        property.description?.[0] ||
        "Explore apartment details, photos, price and location.",
      images: [
        {
          url: property?.media?.url || "/no-image.png",
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: property.title,
      description:
        property.description?.[0] ||
        "Check apartment details in Gurgaon.",
    },
  };

}

/* ================= PAGE ================= */

export default async function Page({ params }) {

  const { slug } = await params;

  if (!slug) {
    return notFound();
  }

  const property = await getPropertyBySlug(slug);

  if (!property) {
    return notFound();
  }

  return (
    <div className="bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8] min-h-screen">

      <PropertyDetails propertyy={property} />

      {/* SEO BOOST (Hidden Content) */}
      <div className="hidden">
        Affordable apartments in Gurgaon, flats in {property.locality}, 
        {property.propertyType} property, budget homes near Delhi NCR.
      </div>

    </div>
  );

}