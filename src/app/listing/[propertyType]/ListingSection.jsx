"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useProperty } from "@/contextapi/propertycontext";
import Image from "next/image";
import Link from "next/link";
import ContactPopup from "@/components/ContactPopup";
import SidebarEnquiryForm from "@/components/SidebarEnquiryForm";
import Pagination from "@/components/Pagination";
import BHKFilterButtons from "@/components/BHKFilterButtons";
import Breadcrumb from "@/components/Breadcrumb";
import ViewDetailsButton from "@/components/ViewDetailsButton";
import { useClickLimit } from "@/hooks/useClickLimit"; // Hook import

export default function PropertyTypePage() {
  const { propertyType } = useParams();
  const { properties, fetchPropertiesByType, typeLoading, error3, page, totalPages } = useProperty();
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const propertySectionRef = useRef(null);

  // Hook initialize
  const { handlePropertyClick } = useClickLimit();

  const bhk = propertyType?.split("-")[0];

  useEffect(() => {
    if (bhk) fetchPropertiesByType(`${bhk} BHK`, 1);
  }, [bhk]);

  useEffect(() => {
    localStorage.setItem("lastListing", window.location.pathname);
  }, []);

  if (typeLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#faf5ff]">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#B153D7]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#B153D7] border-r-[#F375C2] animate-spin"></div>
        </div>
        <p className="mt-5 text-sm text-gray-600">Loading {bhk} BHK Homes...</p>
      </div>
    );
  }

  if (error3) return <p className="text-center py-20 text-red-500">Something went wrong.</p>;

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-900">No {bhk} BHK Homes Available</h2>
      </div>
    );
  }

  return (
    <section ref={propertySectionRef} className="bg-gradient-to-b from-white via-[#faf5ff] to-[#fdf2f8] px-4 py-16">
      
      {/* HEADING */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="mb-6"><Breadcrumb /></div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          {bhk} BHK <span className="bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">Affordable Apartments</span> in Gurgaon
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl">
          Explore {bhk} BHK apartments in Gurgaon with modern layouts,
          prime locations, and excellent investment potential.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] mt-6 rounded-full"></div>
        <div className="mt-8"><BHKFilterButtons /></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {properties.map((property) => {
            // Slug logic
            const typeSlug = property.propertyType ? property.propertyType.toLowerCase().trim().replace(/[\s\W-]+/g, '-') : "apartment";
            const exploreLink = `https://www.dealacres.com/properties/${typeSlug}-for-rent-in-gurgaon`;

            return (
              <div key={property._id} className="bg-white rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_70px_rgba(158,28,96,0.25)] hover:-translate-y-2 transition duration-300 overflow-hidden md:h-auto">
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* IMAGE */}
                  <div className="relative md:w-[35%]">
                    <Image
                      src={property?.media?.url || "/no-image.png"}
                      unoptimized alt={property.title} width={600} height={400}
                      className="w-full h-52 md:h-full object-cover"
                    />
                    <span onClick={() => { handlePropertyClick(); setSelectedProperty(property.title); setOpen(true); }}
                      className="absolute top-3 left-3 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] text-white text-xs px-4 py-1.5 rounded-full shadow-md font-semibold cursor-pointer">
                      {property.propertyType || "Apartment"}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900">{property.title}</h2>
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

                    <div className="mt-4 bg-[#fff1f6] border border-[#9E1C60]/20 rounded-xl px-4 py-3 flex justify-between text-sm">
                      <div className="text-center flex-1">
                        <span className="text-gray-400 text-xs">TYPE</span>
                        <span className="block font-semibold text-gray-900">{property.propertyCategory}</span>
                      </div>
                      <div className="h-8 w-px bg-[#9E1C60]/20"></div>
                      <div className="text-center flex-1">
                        <span className="text-gray-400 text-xs">STATUS</span>
                        <span className="block font-semibold text-[#9E1C60]">{property.status || "Ready"}</span>
                      </div>
                    </div>

                   <div className="flex gap-3 mt-6">

                    <button
                      onClick={() => {
                        setSelectedProperty(property.title);
                        setOpen(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                      text-white px-4 py-2.5 rounded-xl text-sm shadow-md hover:shadow-lg"
                    >
                      Get Price
                    </button>

                    {/* <Link
                      href={`/properties/${property.slug}`}
                      className="flex-1 border border-[#9E1C60]
                      text-[#9E1C60] px-4 py-2.5 rounded-xl text-sm text-center
                      hover:bg-[#9E1C60] hover:text-white transition"
                    >
                      View Details
                    </Link> */}
                    <ViewDetailsButton
                          slug={property.slug}
                         href={`https://www.dealacres.com/property/${property.slug}`}
                         />

                  </div>

                    {/* EXPLORE MORE & FREE SELL */}
                    <div className="border-t border-gray-100 mt-5 pt-4 flex justify-between items-center text-sm text-gray-500 font-medium">
                      <Link href={exploreLink} target="_blank" onClick={handlePropertyClick} className="group flex items-center gap-1">
                        <h4 className="font-semibold text-gray-700 group-hover:text-[#9E1C60] transition-colors underline-offset-2 hover:underline">Explore more</h4>
                        <span className="text-[#9E1C60] group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                      <div className="h-4 w-px bg-gray-300 mx-2"></div>
                      <Link href="https://www.dealacres.com/sell-property" target="_blank" onClick={handlePropertyClick} className="group flex items-center gap-1">
                        <h4 className="font-semibold text-gray-700 group-hover:text-[#9E1C60] transition-colors underline-offset-2 hover:underline">Free Sell Property</h4>
                        <span className="text-[#9E1C60] group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-16">
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(newPage) => fetchPropertiesByType(`${bhk} BHK`, newPage)} />
          </div>
        </div>

        <div className="lg:col-span-1 sticky top-28">
          <SidebarEnquiryForm />
        </div>
      </div>

      <ContactPopup isOpen={open} onClose={() => setOpen(false)} propertyTitle={selectedProperty} />
    </section>
  );
}