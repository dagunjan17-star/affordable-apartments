"use client";

import { useState, useRef } from "react";
import { useProperty } from "@/contextapi/propertycontext";
import Image from "next/image";
import Link from "next/link";
import ContactPopup from "@/components/ContactPopup";
import SidebarEnquiryForm from "./SidebarEnquiryForm";
import Pagination from "@/components/Pagination";
import BHKFilterButtons from "./BHKFilterButtons";
import ViewDetailsButton from "./ViewDetailsButton";
import NearbyLocations from "./NearbyLocations";
import { useClickLimit } from "@/hooks/useClickLimit"; // Hook import

export default function Properties() {
  const { properties, loading, error, page, setPage, totalPages } = useProperty();
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");
  const propertySectionRef = useRef(null);

  // Hook initialize
  const { handlePropertyClick } = useClickLimit();

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#faf5ff]">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#B153D7]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#B153D7] border-r-[#F375C2] animate-spin"></div>
        </div>
        <p className="mt-5 text-sm font-medium text-gray-600 tracking-wide">Loading Affordable Apartments...</p>
      </div>
    );
  }

  if (error) return <p className="text-center py-20 text-red-500">Something went wrong.</p>;

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-800">No Apartments Available</h2>
      </div>
    );
  }

  return (
    <section id="locations" ref={propertySectionRef} className="bg-gradient-to-b from-white via-[#faf5ff] to-[#fdf2f8] px-4 py-16">
      
      {/* HEADING */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
          Affordable <span className="bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">Apartments</span> in Gurgaon
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl">Discover budget-friendly homes in Gurgaon.</p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] mt-6 rounded-full"></div>
        <div className="mt-8"><BHKFilterButtons /></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {properties.map((property, index) => {
            // Slug Logic
            const typeSlug = property.propertyType ? property.propertyType.toLowerCase().trim().replace(/[\s\W-]+/g, '-') : "apartment";
            const exploreLink = `https://www.dealacres.com/properties/${typeSlug}-for-sale-in-gurgaon`;

            return (
              <div key={property._id}>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(158,28,96,0.25)] transition duration-300 overflow-hidden md:h-[280px]">
                  <div className="flex flex-col md:flex-row h-full">
                    
                    {/* IMAGE */}
                    <div className="relative md:w-[35%]">
                      <Image
                        src={property?.media?.url || "/no-image.png"}
                        unoptimized alt={property.title} width={600} height={400}
                        className="w-full h-56 md:h-full object-cover"
                      />
                      <span onClick={() => { handlePropertyClick(); setSelectedProperty(property.title); setOpen(true); }}
                        className="absolute top-3 left-3 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] text-white text-xs px-4 py-1.5 rounded-full shadow-md font-semibold cursor-pointer">
                        {property.propertyType || "Apartment"}
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h2 className="text-xl font-semibold text-gray-900">{property.title}</h2>
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

                      <div className="mt-4 bg-[#fff1f6] border border-[#9E1C60]/20 rounded-xl px-4 py-3 flex items-center justify-between text-sm">
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-gray-500 text-xs">STATUS</span>
                          <span className="font-semibold text-[#9E1C60]">{property.status || "Available"}</span>
                        </div>
                        <div className="h-8 w-px bg-[#9E1C60]/20"></div>
                        <div className="flex flex-col items-center flex-1">
                          <span className="text-gray-500 text-xs">TYPE</span>
                          <span className="font-semibold text-gray-900">{property.propertyCategory || "Apartment"}</span>
                        </div>
                      </div>

                     <div className="flex gap-3 mt-6">

            <button
              onClick={() => {
                setSelectedProperty(property.title);
                setOpen(true);
              }}
              className="
                flex-1 
                bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                text-white px-4 py-2.5
                rounded-xl
                transition
                text-sm font-medium
                shadow-md hover:shadow-lg cursor-pointer
              "
            >
              Get Price
            </button>

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
                {(index + 1) % 10 === 0 && <NearbyLocations blockIndex={Math.floor(index / 10)} />}
              </div>
            );
          })}

          <div className="mt-16">
            <Pagination page={page} totalPages={totalPages} setPage={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: propertySectionRef.current.getBoundingClientRect().top + window.pageYOffset - 90, behavior: "smooth" });
            }} />
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