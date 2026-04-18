"use client";

import { useEffect, useState, useMemo } from "react";
import { useProperty } from "@/contextapi/propertycontext";
import Image from "next/image";
import Link from "next/link";
import ContactPopup from "@/components/ContactPopup";

export default function FilterProperties({ area }) {

  // ✅ ONLY LOCALITY DATA USE
  const { localityData, loading2, error2, fetchByLocality } = useProperty();

  const safeData = Array.isArray(localityData) ? localityData : [];

  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const formattedArea = area
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // ✅ CORRECT API CALL
  useEffect(() => {
    if (formattedArea) {
      fetchByLocality({
        locality: formattedArea,
        city: "gurgaon",
        propertyType: "1 BHK,2 BHK,3 BHK,4 BHK,5 BHK,6 BHK",
        listingType: "sale",
      });
    }
  }, [formattedArea]);

  /* LOADING */

  if (loading2) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center 
      bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8]">

        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#9E1C60]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent 
          border-t-[#9E1C60] border-r-[#ff4da6] animate-spin"></div>
        </div>

        <p className="mt-6 text-sm font-medium text-gray-600">
          Loading Apartments...
        </p>
      </div>
    );
  }

  /* ERROR */

  if (error2) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center 
      bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8]">
        <p className="text-red-500 text-lg">
          Something went wrong while loading properties.
        </p>
      </div>
    );
  }

  /* EMPTY */

  if (!safeData || safeData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center 
      bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8]">

        <h2 className="text-2xl font-semibold text-gray-800">
          No Apartments Available in {formattedArea}
        </h2>

        <p className="text-gray-500 mt-2">
          New listings will be updated soon.
        </p>

      </div>
    );
  }

  return (

    <section className="bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8] py-6">

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 gap-6">

          {safeData.map((property) => (

            <div
              key={property._id}
              className="bg-white rounded-3xl border border-gray-100
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              hover:shadow-[0_25px_70px_rgba(158,28,96,0.25)]
              hover:-translate-y-2
              transition duration-300 overflow-hidden flex flex-col md:flex-row"
            >

              {/* IMAGE */}

              <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto group">

                {property?.media?.url ? (
                  <Image
                    src={property.media.url}
                    unoptimized
                    alt={property.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="bg-[#fff1f6] w-full h-full flex items-center justify-center text-[#9E1C60] text-sm">
                    No Image
                  </div>
                )}

                {/* BADGE */}

                <span
                  onClick={() => {
                    setSelectedProperty(property.title);
                    setOpen(true);
                  }}
                  className="absolute top-3 left-3
                  bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                  text-white text-xs px-3 py-1.5
                  rounded-full shadow-lg
                  font-medium cursor-pointer"
                >
                  {property.propertyType || "Apartment"}
                </span>

              </div>

              {/* CONTENT */}

              <div className="p-6 flex-1 flex flex-col">

                <h2 className="text-lg font-semibold text-gray-900">
                  {property.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {property.locality}
                </p>

                {/* INFO BAR */}

                <div className="mt-4 bg-[#fff1f6] border border-[#9E1C60]/20 rounded-xl px-4 py-3 text-xs flex items-center justify-between">

                  <div className="flex flex-col items-center flex-1">
                    <span className="text-gray-400">STATUS</span>
                    <span className="font-semibold text-[#9E1C60]">
                      {property.status || "Available"}
                    </span>
                  </div>

                  <div className="h-8 w-px bg-[#9E1C60]/20"></div>

                  <div className="flex flex-col items-center flex-1">
                    <span className="text-gray-400">TYPE</span>
                    <span className="font-semibold text-gray-900">
                      {property.propertyCategory || "Apartment"}
                    </span>
                  </div>

                </div>

                {/* <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                  {property.description ||
                    "Affordable apartment with modern design and prime location."}
                </p> */}

                <div className="flex-1"></div>

                {/* BUTTONS */}

                <div className="mt-5 flex gap-4">

                  <button
                    onClick={() => {
                      setSelectedProperty(property.title);
                      setOpen(true);
                    }}
                    className="bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                    text-white px-5 py-2.5
                    rounded-xl text-sm font-medium
                    hover:opacity-90
                    transition shadow-md cursor-pointer"
                  >
                    Price On Call
                  </button>

                  <Link
                    href={`/properties/${property.slug}`}
                    className="border border-[#9E1C60]
                    text-[#9E1C60]
                    px-5 py-2.5 text-sm
                    rounded-xl
                    hover:bg-[#9E1C60]
                    hover:text-white transition"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <ContactPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        propertyTitle={selectedProperty}
      />

    </section>
  );
}