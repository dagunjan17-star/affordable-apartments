"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

const SidebarEnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    // PHONE VALIDATION
    if (name === "phone") {
      // only numbers
      if (!/^\d*$/.test(value)) return;

      // max 10 digits
      if (value.length > 10) return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    // PHONE CHECK
    if (formData.phone.length !== 10) {
      toast.error(
        "Phone number must be exactly 10 digits."
      );
      return;
    }

    // WEBSITE
    const website =
      typeof window !== "undefined"
        ? window.location.hostname.replace(
            "www.",
            ""
          )
        : "";

    try {
      setLoading(true);

      const payload = {
        ...formData,
        website,
        source: "Sidebar Enquiry Form",
      };

      console.log("PAYLOAD:", payload);

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("STATUS:", res.status);

      const data = await res.json();

      console.log("RESPONSE:", data);

      if (data.success) {
        toast.success(
          "Request submitted successfully!"
        );

        // RESET FORM
        setFormData({
          name: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(
          data.error ||
            "Something went wrong."
        );
      }
    } catch (err) {
      console.log("ERROR:", err);

      toast.error(
        "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (

    <div
      className="sticky top-28 
      bg-white 
      rounded-3xl 
      shadow-[0_20px_60px_rgba(158,28,96,0.15)]
      p-8 border border-[#9E1C60]/10"
    >

      {/* HEADING */}

      <h2 className="text-2xl font-semibold 
      bg-gradient-to-r from-[#ff4da6] to-[#9E1C60]
      bg-clip-text text-transparent mb-2">

        Get Free Consultation

      </h2>

      <p className="text-sm text-gray-600 mb-6 leading-relaxed">

        Looking for affordable apartments in Gurgaon? Share your requirements and our
        property expert will connect you with the best options in prime locations.

      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* NAME */}

        <input
          name="name"
          required
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl 
          border border-gray-300
          text-gray-900 placeholder-gray-500
          focus:ring-2 focus:ring-[#9E1C60] focus:border-[#9E1C60]
          outline-none transition"
        />

        {/* PHONE */}

        <input
          name="phone"
          required
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl 
          border border-gray-300
          text-gray-900 placeholder-gray-500
          focus:ring-2 focus:ring-[#9E1C60] focus:border-[#9E1C60]
          outline-none transition"
        />

        {/* MESSAGE */}

        <textarea
          name="message"
          rows="4"
          placeholder="Budget / Location / BHK"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl 
          border border-gray-300
          text-gray-900 placeholder-gray-500
          focus:ring-2 focus:ring-[#9E1C60] focus:border-[#9E1C60]
          outline-none resize-none transition"
        />

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full
          bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
          text-white py-3
          font-semibold
          rounded-xl
          hover:opacity-90
          transition 
          shadow-md hover:shadow-lg
          disabled:opacity-60 cursor-pointer"
        >

          {loading ? "Submitting..." : "Get Free Consultation"}

        </button>

      </form>

    </div>

  );

};

export default SidebarEnquiryForm;