"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactPopup from "@/components/ContactPopup";

export default function PropertyCard({ property }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="bg-white rounded-3xl border border-gray-100
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        hover:shadow-[0_25px_70px_rgba(158,28,96,0.25)]
        hover:-translate-y-2
        transition duration-300 overflow-hidden flex flex-col h-full"
      >

        {/* IMAGE */}
        <div className="relative w-full h-48 overflow-hidden group">

          <Image
            src={property?.media?.url || "/no-image.png"}
            alt={property.title}
            width={400}
            height={250}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* TYPE BADGE */}
          <span
            onClick={() => setOpen(true)}
            className="absolute top-3 left-3
            bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
            text-white text-xs px-3 py-1.5
            rounded-full
            shadow-md
            font-medium cursor-pointer"
          >
            {property.propertyType || "Apartment"}
          </span>

        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-1">

          <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
            {property.title}
          </h2>

          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243A8 8 0 1117.657 16.657z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>

  {property.locality}
</p>

          {/* STATS */}
          <div className="mt-4 flex gap-3 text-xs">

            <div className="flex-1 bg-[#fff1f6] rounded-xl p-3 text-center border border-[#9E1C60]/10">
              <span className="text-gray-400 block text-[10px] uppercase">
                Type
              </span>
              <span className="font-semibold text-gray-900 text-sm">
                {property.propertyCategory || "Apartment"}
              </span>
            </div>

            <div className="flex-1 bg-[#fff1f6] rounded-xl p-3 text-center border border-[#9E1C60]/10">
              <span className="text-gray-400 block text-[10px] uppercase">
                Status
              </span>
              <span className="font-semibold text-[#9E1C60] text-sm">
                {property.status || "Available"}
              </span>
            </div>

          </div>

          {/* DESCRIPTION */}
          {/* <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
            {property.description ||
              "Affordable apartment with modern design and prime Gurgaon location."}
          </p> */}

          <div className="flex-1" />

          {/* BUTTONS */}
          <div className="mt-4 pt-4 border-t border-gray-100">

            <div className="flex gap-3">

              {/* CONTACT BUTTON */}
              <button
                onClick={() => setOpen(true)}
                className="flex-1
                bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                text-white py-2.5
                rounded-xl
                text-sm font-medium
                transition 
                shadow-md hover:shadow-lg
                cursor-pointer"
              >
                Get Price
              </button>

              {/* VIEW DETAILS */}
              <Link
                href={`/properties/${property.slug}`}
                className="flex-1 border border-[#9E1C60]
                text-[#9E1C60] py-2.5
                rounded-xl
                text-sm font-medium text-center
                hover:bg-[#9E1C60]
                hover:text-white
                transition cursor-pointer"
              >
                View Details
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* CONTACT POPUP */}
      <ContactPopup
        isOpen={open}
        onClose={() => setOpen(false)}
        propertyTitle={property.title}
      />
    </>
  );
}