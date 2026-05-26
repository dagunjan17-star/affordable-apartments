"use client";

import React, { useState } from "react";
import Link from "next/link";
import AlertPopup from "./AlertPopup";

const HeroSection = () => {
   const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [popup, setPopup] = useState({
  open: false,
  type: "success",
  message: "",
});

  const [loading, setLoading] = useState(false);

  // ALERT POPUP STATE
  const [popup, setPopup] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const website =
    typeof window !== "undefined"
      ? window.location.hostname.replace("www.", "")
      : "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // CLOSE ALERT POPUP
  const closePopup = () => {
    setPopup({
      open: false,
      type: "success",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      setPopup({
        open: true,
        type: "error",
        message: "Phone number must be 10 digits",
      });

      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setPopup({
          open: true,
          type: "success",
          message:
            "Enquiry submitted successfully!",
        });

        setFormData({
          name: "",
          phone: "",
          message: "",
        });
      } else {
        setPopup({
          open: true,
          type: "error",
          message:
            "Something went wrong. Try again.",
        });
      }
    } catch (err) {
      setPopup({
        open: true,
        type: "error",
        message:
          "Server error. Please try later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="relative bg-cover bg-center px-4 sm:px-6"
      >
        {/* 🔥 PREMIUM WINE THEME OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#9E1C60]/80 via-[#9E1C60]/60 to-black/80"></div>

        <div className="relative max-w-7xl mx-auto py-12 grid md:grid-cols-12 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="md:col-span-7 lg:col-span-8 text-white">

            <h1 className="text-2xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Affordable{" "}
              <span className="bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">
                Apartments
              </span>{" "}
              in Gurgaon
            </h1>

            <p className="text-lg max-w-2xl text-gray-200 leading-relaxed">
              Affordable living in Gurgaon is no longer a contradiction — it's a reality! Discover our handpicked collection of affordable apartments in Gurgaon that deliver genuine value without compromising on quality, connectivity, or comfort. The city's expanding real estate landscape has given rise to excellent budget-friendly apartment options in emerging sectors along Dwarka Expressway, New Gurgaon, Sohna Road, and the Southern Peripheral Road — offering modern amenities, thoughtful design, and RERA-compliant developer trust at prices that won't stretch your finances. Affordable apartments in Gurgaon are ideal for first-time homebuyers stepping onto the property ladder, young professionals seeking independent living near their corporate offices, and nuclear families wanting a quality home within a disciplined budget. Many of these projects come with government incentives, affordable housing scheme benefits, and home loan subsidies under PMAY (Pradhan Mantri Awas Yojana), making ownership even more accessible. Don't let soaring prices in DLF or Golf Course Road discourage you — Gurgaon's budget apartment market is thriving, vibrant, and full of options worth every rupee. Let us help you find your affordable dream apartment in Gurgaon today!
            </p>

            <Link href="/how-it-works">
              <button className="relative overflow-hidden bg-[#9E1C60] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:bg-[#9E1C60] hover:shadow-xl hover:scale-105 mt-4 cursor-pointer">

                <span className="relative z-10">
                  Learn More
                </span>

                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition duration-700"></span>

              </button>
            </Link>

          </div>

          {/* RIGHT FORM */}
          <div className="md:col-span-5 lg:col-span-4">

            <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-white">

              <h2 className="text-2xl font-semibold mb-2">
                Book a Free Consultation
              </h2>

              <p className="text-sm mb-6 text-gray-200">
                Get best deals on affordable apartments.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  name="name"
                  required
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl 
                  bg-white/10 border border-white/30
                  text-white placeholder-white/70
                  focus:ring-2 focus:ring-[#9E1C60] focus:border-[#9E1C60]
                  outline-none transition"
                />

                <input
                  name="phone"
                  required
                  inputMode="numeric"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl 
                  bg-white/10 border border-white/30
                  text-white placeholder-white/70
                  focus:ring-2 focus:ring-[#9E1C60] focus:border-[#9E1C60]
                  outline-none transition"
                />

                <textarea
                  rows="3"
                  name="message"
                  placeholder="Budget / Location / BHK"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl 
                  bg-white/10 border border-white/30
                  text-white placeholder-white/70
                  focus:ring-2 focus:ring-[#9E1C60] focus:border-[#9E1C60]
                  outline-none resize-none transition"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 font-semibold 
                  bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
                  text-white 
                  hover:opacity-90
                  transition duration-300 
                  disabled:opacity-70 
                  shadow-lg shadow-[#9E1C60]/40
                  rounded-xl cursor-pointer"
                >
                  {loading ? "Submitting..." : "Get Details"}
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* ALERT POPUP */}
      <AlertPopup
        open={popup.open}
        type={popup.type}
        message={popup.message}
        onClose={closePopup}
      />
    </>
  );
};

export default HeroSection;