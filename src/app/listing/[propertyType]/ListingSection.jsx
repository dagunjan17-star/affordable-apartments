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

export default function PropertyTypePage() {

  const { propertyType } = useParams();

  const {
    properties,
   fetchPropertiesByType,
typeLoading,
error3,
    page,
    totalPages
  } = useProperty();

  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState("");

  const propertySectionRef = useRef(null);

  /* FETCH */

const bhk = propertyType?.split("-")[0];

  useEffect(() => {
    if (bhk) {
      fetchPropertiesByType(`${bhk} BHK`, 1);
    }
  }, [bhk]);
  useEffect(() => {
  localStorage.setItem("lastListing", window.location.pathname);
}, []);

  /* LOADING */

  if (typeLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center 
      bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8]">

        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#9E1C60]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#9E1C60] border-r-[#ff4da6] animate-spin"></div>
        </div>

        <p className="mt-5 text-sm text-gray-600">
          Loading {bhk} BHK Apartments...
        </p>

      </div>
    );
  }

  if (error3) {
    return (
      <p className="text-center py-20 text-red-500">
        Something went wrong while loading properties.
      </p>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20">

        <h2 className="text-2xl font-semibold text-gray-900">
          No {bhk} BHK Apartments Available
        </h2>

        <p className="text-gray-500 mt-2">
          New listings will be updated soon.
        </p>

      </div>
    );
  }

  return (

    <section
      ref={propertySectionRef}
      className="bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8] px-4 py-16"
    >
      {/* HEADING */}

      <div className="max-w-7xl mx-auto mb-12">
<div className="mb-6">
   <Breadcrumb />
  </div>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          {bhk} BHK{" "}
          <span className="bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">
           Affordable Apartments
          </span>{" "}
          in Gurgaon
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl">
          Explore {bhk} BHK apartments in Gurgaon with modern layouts,
          prime locations, and excellent investment potential.
        </p>

        <div className="w-24 h-1 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] mt-6 rounded-full"></div>

        <div className="mt-8">
          <BHKFilterButtons />
        </div>

      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT LIST */}

        <div className="lg:col-span-2 space-y-8">

          {properties.map((property) => (

            <div
              key={property._id}
              className="bg-white rounded-3xl border border-gray-100
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
              hover:shadow-[0_25px_70px_rgba(158,28,96,0.25)]
              hover:-translate-y-2 transition duration-300 overflow-hidden md:h-[260px]"
            >

              <div className="flex flex-col md:flex-row h-full">

                {/* IMAGE */}
                <div className="relative md:w-[35%]">

                  <Image
                    src={property?.media?.url || "/no-image.png"}
                    alt={property.title}
                    width={600}
                    height={400}
                    className="w-full h-52 md:h-full object-cover"
                  />

                  <span
                    onClick={() => {
                      setSelectedProperty(property.title);
                      setOpen(true);
                    }}
                    className="absolute top-3 left-3
                    bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                    text-white text-xs px-4 py-1.5
                    rounded-full shadow-md cursor-pointer"
                  >
                    {property.propertyType || "Apartment"}
                  </span>

                </div>

                {/* DETAILS */}

                <div className="p-6 flex-1 flex flex-col">

                  <h2 className="text-lg font-semibold text-gray-900">
                    {property.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {property.locality}
                  </p>

                  {/* INFO BAR */}

                  <div className="mt-4 bg-[#fff1f6] border border-[#9E1C60]/20 rounded-xl px-4 py-3 flex justify-between text-sm">

                    <div className="text-center flex-1">
                      <span className="text-gray-400 text-xs">TYPE</span>
                      <span className="block font-semibold text-gray-900">
                        {property.propertyCategory || "Apartment"}
                      </span>
                    </div>

                    <div className="h-8 w-px bg-[#9E1C60]/20"></div>

                    <div className="text-center flex-1">
                      <span className="text-gray-400 text-xs">STATUS</span>
                      <span className="block font-semibold text-[#9E1C60]">
                        {property.status || "Ready"}
                      </span>
                    </div>

                  </div>

                  {/* <p className="text-sm text-gray-600 mt-4 line-clamp-2">
                    {property.description || "Affordable apartment with modern design and great location."}
                  </p> */}

                  <div className="flex-1"></div>

                  {/* BUTTONS */}

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

                </div>

              </div>

            </div>

          ))}

          {/* PAGINATION */}

          <div className="mt-16">

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => {
                fetchPropertiesByType(`${propertyType} BHK`, newPage);
              }}
            />

          </div>

        </div>

        {/* SIDEBAR */}

        <div className="lg:col-span-1 sticky top-28">
          <SidebarEnquiryForm />
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