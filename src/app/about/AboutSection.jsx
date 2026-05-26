"use client";

import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb"
export default function AboutPage() {
  return (
    <section className="bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8] px-4 py-20">
      <div className="max-w-7xl mx-auto">
       <div className="py-5">
            <Breadcrumb/>
           </div>
        {/* HERO */}

        <div className="grid md:grid-cols-2 gap-16 items-center mb-28">

          {/* LEFT */}

          <div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">

              About{" "}
              <span className="bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">
                Affordable Apartments in Gurgaon
              </span>

            </h1>

            <p className="text-gray-600 mt-6 leading-relaxed text-lg">

              We help you find the best affordable apartments in Gurgaon
              through verified listings, trusted developers, and expert guidance.

            </p>

            <p className="text-gray-600 mt-4 leading-relaxed text-lg">

              Whether you're a first-time home buyer or an investor, our platform
              connects you with the right apartment in prime locations with the best value.

            </p>

            <div className="mt-8 flex gap-4 flex-wrap">

              <Link
                href="/"
                className="bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                text-white px-6 py-3
                rounded-xl font-medium
                hover:opacity-90
                transition shadow-md hover:shadow-lg"
              >
                Browse Apartments
              </Link>

              <Link
                href="/contact"
                className="border border-[#9E1C60] text-[#9E1C60]
                px-6 py-3 rounded-xl font-medium
                hover:bg-[#9E1C60]
                hover:text-white transition"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* IMAGE */}

          <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(158,28,96,0.25)] group">

            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Apartments in Gurgaon"
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

          </div>

        </div>


        {/* MISSION */}

        <div className="mb-28 max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg">

            Gurgaon is one of India’s fastest-growing real estate markets. 
            Our mission is to simplify apartment buying by providing a trusted 
            platform where users can explore verified properties with full confidence.

          </p>

          <p className="text-gray-600 mt-6 leading-relaxed text-lg">

            From Golf Course Road to Dwarka Expressway and New Gurgaon,
            we bring you the best apartments across every key location.

          </p>

        </div>


        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-10 mb-28">

          <div className="bg-white rounded-3xl p-10 shadow-[0_15px_40px_rgba(158,28,96,0.15)] border border-[#9E1C60]/10 text-center">
            <h3 className="text-4xl font-bold text-[#9E1C60]">
              2500+
            </h3>
            <p className="text-gray-600 mt-3 text-sm">
              Apartments Listed
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-[0_15px_40px_rgba(158,28,96,0.15)] border border-[#9E1C60]/10 text-center">
            <h3 className="text-4xl font-bold text-[#ff4da6]">
              350+
            </h3>
            <p className="text-gray-600 mt-3 text-sm">
              Active Projects
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-[0_15px_40px_rgba(158,28,96,0.15)] border border-[#9E1C60]/10 text-center">
            <h3 className="text-4xl font-bold text-[#9E1C60]">
              5000+
            </h3>
            <p className="text-gray-600 mt-3 text-sm">
              Happy Clients
            </p>
          </div>

        </div>


        {/* WHY US */}

        <div className="mb-28">

          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition border border-[#9E1C60]/10">
              <h3 className="font-semibold text-lg text-[#9E1C60] mb-3">
                Verified Listings
              </h3>
              <p className="text-gray-600 text-sm">
                All apartments are verified to ensure authenticity and trust.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition border border-[#9E1C60]/10">
              <h3 className="font-semibold text-lg text-[#ff4da6] mb-3">
                Prime Locations
              </h3>
              <p className="text-gray-600 text-sm">
                We focus on the best residential sectors in Gurgaon.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition border border-[#9E1C60]/10">
              <h3 className="font-semibold text-lg text-[#9E1C60] mb-3">
                Expert Support
              </h3>
              <p className="text-gray-600 text-sm">
                Get personalized guidance to choose the right apartment.
              </p>
            </div>

          </div>

        </div>


        {/* CTA */}

        <div className="bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] text-white rounded-3xl p-16 text-center shadow-[0_30px_80px_rgba(158,28,96,0.3)]">

          <h2 className="text-3xl font-bold mb-4">
            Find Your Perfect Apartment Today
          </h2>

          <p className="text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">

            Explore verified apartments across Gurgaon with the best prices,
            premium locations, and modern amenities.

          </p>

          <Link
            href="/"
            className="inline-block bg-white text-[#9E1C60]
            px-6 py-3 rounded-xl font-semibold
            hover:bg-gray-100 transition"
          >
            Browse Apartments
          </Link>

        </div>

      </div>
    </section>
  );
}