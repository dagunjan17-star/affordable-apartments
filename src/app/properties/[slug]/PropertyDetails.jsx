"use client";

import ContactPopup from "@/components/ContactPopup";
import Image from "next/image";
import { useState,useMemo, useEffect } from "react";
import { useProperty } from "@/contextapi/propertycontext";
import PropertyCard from "@/components/PropertyCard";
export default function PropertyDetails({ propertyy }) {

  const [open, setOpen] = useState(false);

  const { allProperties } = useProperty(); // ✅ correct
  const [relatedLoading, setRelatedLoading] = useState(true);

  /* FORMAT AREA */

  const formatArea = (area, unit) => {
    if (!area) return "—";
    const formattedNumber = Number(area).toLocaleString("en-IN");
    if (!unit) return formattedNumber;
    const formattedUnit =
      unit.charAt(0).toUpperCase() + unit.slice(1).toLowerCase();
    return `${formattedNumber} ${formattedUnit}`;
  };

  /* SHUFFLE */

  const shuffled = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  /* RELATED */
const relatedProperties = useMemo(() => {
  if (!allProperties?.length) return [];

  let filtered = allProperties.filter(
    (p) =>
      p._id !== propertyy._id &&
      p.city &&
      propertyy.city &&
      p.city.toLowerCase().includes(propertyy.city.toLowerCase())
  );

  // 🔥 fallback if less data
  if (filtered.length < 30) {
    filtered = allProperties.filter((p) => p._id !== propertyy._id);
  }

  const shuffled = [...filtered].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 30);
}, [allProperties, propertyy]);
 


  useEffect(() => {
    setRelatedLoading(false);
  
}, [allProperties]);
 





  return (

    <div className="bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8] text-gray-900 px-4 sm:px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* TOP GRID */}

        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr] gap-10 md:gap-14 items-start">

          {/* IMAGE */}

          <div className="relative w-full h-[260px] md:h-[360px] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(158,28,96,0.25)] group">

            {propertyy?.media?.url ? (
              <Image
                src={propertyy.media.url}
                unoptimized
                alt={propertyy?.title}
                fill
                priority
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-[#fff1f6] text-[#9E1C60]">
                No Image Available
              </div>
            )}

            {/* BADGE */}
            <span className="absolute top-4 left-4 
            bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
            text-white text-xs px-4 py-1.5 rounded-full shadow-md">
              {propertyy?.propertyType || "Apartment"}
            </span>

          </div>

          {/* RIGHT CONTENT */}

          <div className="flex flex-col justify-between h-full">

            <div>

              <h1 className="text-2xl md:text-4xl font-bold leading-tight text-gray-900">
                {propertyy?.title}
              </h1>

              <p className="text-gray-500 mt-2">
                {propertyy?.locality}
              </p>

              {/* META GRID */}

              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">

                <Meta label="Category" value={propertyy?.propertyCategory || "Apartment"} />
                <Meta label="Type" value={propertyy?.propertyType} />
                <Meta label="Listing" value={propertyy?.listingType} />
                <Meta label="City" value={propertyy?.city} />
                <Meta label="State" value={propertyy?.state} />

                {propertyy?.bedrooms > 0 && (
                  <Meta label="Bedrooms" value={propertyy?.bedrooms} />
                )}

                {propertyy?.bathrooms > 0 && (
                  <Meta label="Bathrooms" value={propertyy?.bathrooms} />
                )}

              </div>

            </div>

            {/* CTA */}

            <div className="mt-10 flex gap-4">

              <button
                onClick={() => setOpen(true)}
                className="bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                text-white px-8 py-3 rounded-xl
                text-sm font-semibold
                shadow-md hover:shadow-lg transition"
              >
                Get Best Price
              </button>

              {/* <button
                onClick={() => window.open(`tel:+91XXXXXXXXXX`)}
                className="border border-[#9E1C60]
                text-[#9E1C60] px-6 py-3 rounded-xl
                text-sm font-semibold
                hover:bg-[#9E1C60] hover:text-white transition"
              >
                Call Now
              </button> */}

            </div>

          </div>

        </div>

        {/* DESCRIPTION */}

        <section className="mt-16 md:mt-20 border-t border-[#9E1C60]/10 pt-10">

          <h2 className="text-2xl font-semibold text-gray-900">
            Apartment Description
          </h2>

          <div className="mt-6 space-y-4 text-sm text-gray-600 leading-relaxed max-w-4xl">

            {propertyy?.description2?.length > 0 ? (
              propertyy.description2.map((text, i) => (
                <p key={i}>{text}</p>
              ))
            ) : (
              <p>No additional description available.</p>
            )}

          </div>

        </section>
        {relatedProperties.length > 0 && (

          <section className="mt-20 md:mt-24">

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-10">
              Similar Properties
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

              {relatedProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}

            </div>

          </section>

        )}


        
      </div>

      <ContactPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        propertyTitle={propertyy?.title}
      />

    </div>

  );

}

/* META CARD */

function Meta({ label, value }) {

  return (

    <div className="bg-white border border-[#9E1C60]/10 rounded-xl p-4
    shadow-sm hover:shadow-md transition">

      <div className="text-gray-400 text-xs uppercase tracking-wider">
        {label}
      </div>

      <div className="mt-1 font-semibold text-gray-900">
        {value || "—"}
      </div>

    </div>

  );

}