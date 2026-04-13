"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function BHKFilterButtons() {
  const bhkOptions = ["1", "2", "3", "4"];

 const createSlug = (bhk) => {
  return `${bhk}-bhk-affordable-houses-in-gurgaon`;
};

  return (
    <div className="flex flex-wrap gap-4">

      {bhkOptions.map((bhk) => {

      

        return (
          <Link
          key={bhk}
          href={`/listing/${createSlug(bhk)}`}
          className="px-3 sm:px-6 py-1.5 sm:py-3 rounded-xl
          text-xs sm:text-sm md:text-base font-medium 
          border border-[#9E1C60]/40 text-[#9E1C60] 
          hover:bg-gradient-to-r from-[#ff4da6] to-[#9E1C60]
          hover:text-white 
          transition-all duration-200 text-center whitespace-nowrap
          shadow-sm hover:shadow-md"
        >
            {bhk} BHK Apartments
          </Link>
        );
      })}

    </div>
  );
}