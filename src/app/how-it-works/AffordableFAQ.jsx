"use client";
import { useState } from "react";

export default function AffordableFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "1. Are Affordable Apartments in Gurgaon good for investment?",
      a: "Yes, they are a good option. Property prices are rising, and demand is high. Affordable housing in Gurgaon gives good future returns.",
    },
    {
      q: "2. What is the price range of budget apartments in Gurgaon?",
      a: "Prices vary by location. Developing areas offer cheaper options, while prime areas cost more.",
    },
    {
      q: "3. How can I find cheap flats in Gurgaon safely?",
      a: "Use a trusted platform with verified listings. This ensures you get real and safe options.",
    },
    {
      q: "4. Is it better to buy or rent in Gurgaon?",
      a: "It depends on your needs. Buying Affordable Apartments in Gurgaon is better for long-term investment.",
    },
    {
      q: "5. What documents should I check before buying?",
      a: "Check sale deeds, approvals, and identity proof. This ensures safe buying of low cost flats in Gurgaon.",
    },
    {
      q: "6. Can I avoid broker charges?",
      a: "Yes, by using a platform with direct buyer-seller interaction. This removes middlemen.",
    },
    {
      q: "7. Which areas have affordable housing in Gurgaon?",
      a: "Sohna Road, New Gurgaon, and Dwarka Expressway offer good options.",
    },
    {
      q: "8. Are studio apartments a good choice?",
      a: "Yes, they are budget-friendly and easy to maintain. Good for singles.",
    },
    {
      q: "9. Can I list my property for free?",
      a: "Yes, with free property listing, sellers can list apartments without cost.",
    },
    {
      q: "10. Why is Gurgaon good for affordable housing?",
      a: "Gurgaon offers jobs, infrastructure, and growth. This increases demand for Affordable Apartments in Gurgaon.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-[#fdf2f8] to-[#fff1f6] py-6 px-4 md:px-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Heading */}
        <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">
          FAQs – Affordable Apartments in Gurgaon
        </h2>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className={`border border-[#ffd6e5] rounded-xl px-4 py-3 cursor-pointer transition-all duration-300
                ${
                  isOpen
                    ? "bg-[#ffe4ef] shadow-md"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                {/* Question */}
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#1a1a1a]">
                    {faq.q}
                  </span>

                  <span
                    className={`text-sm text-[#1a1a1a] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-700">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}