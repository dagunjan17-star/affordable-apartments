"use client";

import { useState } from "react";
import Link from "next/link";

import { locations } from "../data/locations"

const createSlug = (location) => {
  return location
    .replace(", Gurgaon", "")
    .toLowerCase()
    .replace(/,/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function Footer() {

  const [showAll, setShowAll] = useState(false);

  const initialCount = 40;

  const visibleLocations = showAll
    ? locations
    : locations.slice(0, initialCount);

  return (
    <footer className="bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8] pt-16 pb-8 px-4 border-t border-[#9E1C60]/20">

      <div className="max-w-7xl mx-auto">

        {/* LOCATIONS */}

        <div className="mb-12">

          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            Affordable Apartments Near Gurgaon (Faridabad Locations)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 text-sm">

            {visibleLocations.map((loc, index) => (

              <div key={index} className="relative group">

                <Link
                  href={`/affordable-apartments-in-${createSlug(loc)}-gurgaon`}
                  className="block truncate text-gray-500 hover:text-[#9E1C60] transition"
                >
                  Affordable Apartments in {loc}
                </Link>

                {/* TOOLTIP */}
                <div
                  className="
                  absolute left-1/2 -translate-x-1/2 bottom-full mb-2
                  opacity-0 scale-95
                  group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-200
                  whitespace-nowrap
                  bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                  text-white text-xs
                  px-3 py-1.5 rounded-md
                  shadow-md
                  z-[9999]
                  pointer-events-none
                "
                >
                  Affordable Apartments in {loc}
                </div>

              </div>

            ))}

            {/* VIEW MORE / LESS */}

            {!showAll && locations.length > initialCount && (
              <div>
                <span
                  onClick={() => setShowAll(true)}
                  className="block cursor-pointer text-[#9E1C60] hover:underline"
                >
                  View More...
                </span>
              </div>
            )}

            {showAll && locations.length > initialCount && (
              <div>
                <span
                  onClick={() => setShowAll(false)}
                  className="block cursor-pointer text-[#9E1C60] hover:underline"
                >
                  View Less...
                </span>
              </div>
            )}

          </div>

        </div>

        {/* BOTTOM */}
{/* 🔥 Bottom Navigation Buttons - CENTER */}
<div className="border-t border-[#9E1C60]/20 pt-6 mt-10 mb-6">
  <div className="flex justify-center items-center">

    <div className="flex flex-wrap gap-6 justify-center text-sm">
      <Link
        href="/about"
        className="text-gray-500 hover:text-[#9E1C60] transition"
      >
        About
      </Link>

      <Link
        href="/blog"
        className="text-gray-500 hover:text-[#9E1C60] transition"
      >
        Blog
      </Link>

      <Link
        href="/contact"
        className="text-gray-500 hover:text-[#9E1C60] transition"
      >
        Contact
      </Link>

      <Link
        href="/how-it-works"
        className="text-gray-500 hover:text-[#9E1C60] transition"
      >
        How It's Work
      </Link>
    </div>

  </div>
</div>
        <div className="border-t border-[#9E1C60]/20 pt-6 flex flex-col md:flex-row items-center justify-between">

          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} AffordableApartmentsGurgaon.com | All rights reserved.
          </p>

          <p className="text-sm text-gray-600 mt-3 md:mt-0">
            Designed By - {" "}
            <Link
              href="https://www.parcharmanch.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9E1C60] transition underline underline-offset-4"
            >
              Parchar Manch
            </Link>
          </p>

        </div>

      </div>

    </footer>
  );
}