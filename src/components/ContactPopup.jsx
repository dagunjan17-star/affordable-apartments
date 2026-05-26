"use client";

import { useState } from "react";
import AlertPopup from "./AlertPopup";

export default function ContactPopup({
  isOpen,
  onClose,
  propertyTitle,
}) {
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

  // CLOSE POPUP
  if (!isOpen) return null;

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

  // CLOSE ALERT POPUP
  const closePopup = () => {
    setPopup({
      open: false,
      type: "success",
      message: "",
    });

    // MAIN POPUP CLOSE
    onClose();
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {
    e.preventDefault();

    // PHONE CHECK
    if (formData.phone.length !== 10) {
      setPopup({
        open: true,
        type: "error",
        message:
          "Phone number must be exactly 10 digits",
      });

      return;
    }

    // WEBSITE NAME
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
        propertyTitle,
        website,
        source: "Popup Enquiry",
      };

      console.log("PAYLOAD:", payload);

      // IMPORTANT
      // /api/submit use karo
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
        setPopup({
          open: true,
          type: "success",
          message:
            "Enquiry Submitted Successfully!",
        });

        // RESET FORM
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
            data.message ||
            "Something went wrong",
        });
      }
    } catch (err) {
      console.log("ERROR:", err);

      setPopup({
        open: true,
        type: "error",
        message:
          "Server error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4">

        {/* POPUP CARD */}

        <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-7
        bg-white/95 backdrop-blur-xl
        shadow-[0_30px_80px_rgba(158,28,96,0.25)]
        border border-[#9E1C60]/10
        max-h-[90vh] overflow-y-auto">

          {/* CLOSE BUTTON */}

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center
            rounded-full bg-gray-100 
            hover:bg-gradient-to-r hover:from-[#9E1C60] hover:to-[#ff4da6]
            hover:text-white text-gray-500 transition"
          >
            ×
          </button>

          {/* TITLE */}

          <h3 className="text-xl font-semibold 
          bg-gradient-to-r from-[#ff4da6] to-[#9E1C60]
          bg-clip-text text-transparent">
            Get Apartment Details
          </h3>

          {/* PROPERTY */}

          <p className="text-sm text-gray-600 mt-2 mb-5">
            Enquiry for:
            <span className="block font-medium text-gray-900 mt-1">
              {propertyTitle}
            </span>
          </p>

          {/* FORM */}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* NAME */}
            <input
              name="name"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm
              border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-[#9E1C60]
              focus:border-[#9E1C60]
              outline-none placeholder:text-gray-500 transition"
            />

            {/* PHONE */}
            <input
              name="phone"
              required
              inputMode="numeric"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm
              border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-[#9E1C60]
              focus:border-[#9E1C60]
              outline-none placeholder:text-gray-500 transition"
            />

            {/* MESSAGE */}
            <textarea
              name="message"
              rows="3"
              placeholder="Budget / Location / BHK"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 text-sm
              border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-[#9E1C60]
              focus:border-[#9E1C60]
              outline-none resize-none placeholder:text-gray-500 transition text-gray-900"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm
              bg-gradient-to-r from-[#9E1C60] to-[#ff4da6]
              text-white font-semibold
              rounded-xl
              transition 
              shadow-md hover:shadow-lg
              disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Submitting..." : "Get Best Price"}
            </button>

          </form>

        </div>

      </div>

      {/* ALERT POPUP */}
      <AlertPopup
        open={popup.open}
        type={popup.type}
        message={popup.message}
        onClose={closePopup}
      />
    </>

  );

}