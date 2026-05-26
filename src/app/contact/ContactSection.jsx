"use client"

import { useState } from "react"
import Image from "next/image"
import AlertPopup from "@/components/AlertPopup"

export default function Page() {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  // ALERT POPUP STATE
  const [popup, setPopup] = useState({
    open: false,
    type: "success",
    message: "",
  })

  const website =
    typeof window !== "undefined"
      ? window.location.hostname.replace("www.", "")
      : ""

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return
      if (value.length > 10) return
    }

    setFormData({ ...formData, [name]: value })
  }

  // CLOSE ALERT POPUP
  const closePopup = () => {
    setPopup({
      open: false,
      type: "success",
      message: "",
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (formData.phone.length !== 10) {

      setPopup({
        open: true,
        type: "error",
        message: "Phone number must be 10 digits",
      })

      return
    }

    setLoading(true)

    try {

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          website,
          source: "Affordable Homes Contact Form",
        }),
      })

      const result = await res.json()

      if (result.success) {

        setPopup({
          open: true,
          type: "success",
          message: "Your enquiry has been submitted!",
        })

        setFormData({
          name: "",
          phone: "",
          message: "",
        })

      } else {

        setPopup({
          open: true,
          type: "error",
          message:
            "Something went wrong. Please try again.",
        })

      }

    } catch (err) {

      setPopup({
        open: true,
        type: "error",
        message:
          "Server error. Please try later.",
      })

    } finally {
      setLoading(false)
    }
  }

  return (

    <>
      <section className="bg-gradient-to-b from-white via-[#faf5ff] to-[#fdf2f8] py-20 px-4 sm:px-6">

        <div className="max-w-7xl mx-auto">

          {/* HEADING */}

          <div className="text-center mb-16">

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">

              Find Your{" "}
              <span className="bg-gradient-to-r from-[#F375C2] to-[#B153D7] bg-clip-text text-transparent">
                Perfect Home
              </span>

            </h1>

            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">

              Looking to buy an affordable home in Gurgaon? Our property experts
              will help you find the best options based on your budget and
              preferred location.

            </p>

          </div>

          {/* FORM + IMAGE */}

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* FORM */}

            <div className="bg-white border border-gray-100
            rounded-3xl p-10 
            shadow-[0_15px_40px_rgba(0,0,0,0.08)]
            hover:shadow-[0_20px_60px_rgba(177,83,215,0.15)]
            transition duration-500">

              <h2 className="text-2xl font-semibold mb-2 
              bg-gradient-to-r from-[#F375C2] to-[#B153D7] bg-clip-text text-transparent">
                Get Free Consultation
              </h2>

              <p className="text-gray-500 mb-8 text-sm">
                Fill your details and our expert will contact you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NAME */}
                <div>
                  <label className="text-sm text-gray-600">Full Name*</label>

                  <input
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-[#faf5ff]
                    border border-gray-200 text-gray-900
                    focus:ring-2 focus:ring-[#B153D7] outline-none transition"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm text-gray-600">Phone*</label>

                  <input
                    name="phone"
                    required
                    inputMode="numeric"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-[#fdf2f8]
                    border border-gray-200 text-gray-900
                    focus:ring-2 focus:ring-[#F375C2] outline-none transition"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="text-sm text-gray-600">Message</label>

                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Budget / Location / Size..."
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-2 w-full px-4 py-3 rounded-xl bg-[#faf5ff]
                    border border-gray-200 text-gray-900
                    focus:ring-2 focus:ring-[#B153D7] outline-none resize-none transition"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-[#B153D7] to-[#F375C2]
                  text-white
                  hover:opacity-90
                  transition 
                  shadow-md hover:shadow-lg"
                >
                  {loading ? "Submitting..." : "Get Best Price "}
                </button>

              </form>

            </div>

            {/* IMAGE */}

            <div className="relative h-[520px] rounded-3xl overflow-hidden border border-gray-100 shadow-xl group">

              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="Home Consultation"
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            </div>

          </div>

          {/* MAP */}

          <div className="mt-24 rounded-3xl overflow-hidden border border-gray-100 shadow-xl">

            <iframe
  title="Location"
  src="https://www.google.com/maps?q=Gurgaon&z=14&output=embed"
  className="w-full h-[500px] border-0"
  loading="lazy"
/>

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

  )
}