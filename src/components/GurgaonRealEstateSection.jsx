"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question:
      "What is the price range of affordable apartments in Gurgaon?",
    answer:
      "Affordable apartments in Gurgaon are generally priced between ₹20 lakh and ₹60 lakh for 1BHK and 2BHK units, primarily in sectors along Dwarka Expressway, New Gurgaon, and Sohna Road.",
  },
  {
    question:
      "Which sectors in Gurgaon offer the most affordable apartments?",
    answer:
      "Best sectors for affordable apartments include Sectors 82-95 (New Gurgaon), Sectors 99-115 (Dwarka Expressway), Sector 70-75 (Sohna Road extension), and emerging micro-markets near the KMP Expressway.",
  },
  {
    question:
      "Am I eligible for PMAY subsidy on an affordable apartment in Gurgaon?",
    answer:
      "If your annual household income is below ₹18 lakh and you don't own a pucca house anywhere in India, you may be eligible for PMAY-CLSS subsidy of ₹2.67 lakh (EWS/LIG) or ₹2.35 lakh (MIG) on your home loan.",
  },
  {
    question:
      "Are affordable apartments in Gurgaon RERA registered?",
    answer:
      "Yes, all affordable housing projects above 500 sq mt area or with 8+ apartments in Gurgaon must be HRERA (Haryana RERA) registered. Verify the RERA number on the official hrera.org.in portal.",
  },
  {
    question:
      "What amenities can I expect in affordable apartment projects in Gurgaon?",
    answer:
      "Most affordable projects offer gated security, CCTV, power backup for common areas, a clubhouse, children's play area, landscaped gardens, and adequate parking — though facilities may be more basic than premium projects.",
  },
  {
    question:
      "Is public transport accessible from affordable apartment areas in Gurgaon?",
    answer:
      "Connectivity is improving. The Dwarka Expressway metro extension and upcoming metro corridors will significantly improve public transport access to affordable sectors. Many areas are also served by HRTC and DTC buses.",
  },
  {
    question:
      "Can I get a home loan for an affordable apartment in Gurgaon under ₹40 lakh?",
    answer:
      "Yes, banks readily finance affordable apartments below ₹40 lakh with loan amounts up to 90% of the property value. Interest rates for PMAY-eligible borrowers can be as low as 6.5% after subsidy adjustment.",
  },
  {
    question:
      "What are typical maintenance charges in affordable Gurgaon apartment societies?",
    answer:
      "Maintenance charges in affordable housing societies typically range from ₹1,500 to ₹3,500 per month for a 2BHK unit, covering security, housekeeping, gardens, and common utilities.",
  },
  {
    question:
      "Are there rental income opportunities from affordable apartments in Gurgaon?",
    answer:
      "Yes. Affordable apartments in Gurgaon near corporate zones enjoy steady rental demand from blue-collar and entry-level white-collar workers. Rental yields of 4-5% annually are achievable in well-located affordable projects.",
  },
  {
    question:
      "What is the possession timeline for new affordable apartment projects in Gurgaon?",
    answer:
      "Timelines vary by project and developer. Under HRERA regulations, developers must adhere to declared possession dates or face penalties. Always check a developer's track record and HRERA complaint history before booking.",
  },
];

export default function GurgaonRealEstateSection() {
  const [openIndex, setOpenIndex] = useState(0);
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};
  return (
    <>
     <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(faqSchema),
    }}
  />
   <section className="relative overflow-hidden bg-white py-10 px-4 sm:px-6">

  {/* Background Lights */}
  <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-[#9E1C60]/10 blur-3xl" />

  <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-[#9E1C60]/10 blur-3xl" />

  {/* Border Circles */}
  <div className="absolute top-16 left-10 h-24 w-24 rounded-full border border-[#9E1C60]/20" />

  <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full border border-[#9E1C60]/10" />

  <div className="relative z-10 max-w-7xl mx-auto">

    {/* Main Content Box */}
    <div className="rounded-[34px] border border-blue-100 bg-gradient-to-br from-blue-50/70 via-white to-blue-50/70 p-8 md:p-14 shadow-[0_20px_60px_rgba(0,70,255,0.08)]">

      {/* Heading */}
      <h2 className="text-xl md:text-4xl font-bold leading-tight text-gray-900 max-w-5xl">
        About
        <span className="text-[#9E1C60]">
          {" "}Gurgaon Real Estate
        </span>
      </h2>

      {/* Paragraphs */}
      <div className="mt-8 space-y-7">

        <p className="text-lg leading-9 text-gray-600">
Gurgaon's affordable apartment segment has emerged as one of the most dynamic real estate categories in the entire NCR region. The Haryana government's progressive affordable housing policies, including the DDJAY scheme and mandatory 20% affordable housing quota in large group housing projects, have created a significant supply of budget-friendly apartments across the city. Sectors along Dwarka Expressway (Sectors 99-115), New Gurgaon (Sectors 82-95), Sohna Road, and the Gurugram-Manesar Urban Complex have become epicentres of affordable apartment supply. Projects from developers like Signature Global, Pyramid Urban Homes, Conscient Habitat, and Adani Group target the ₹25-60 lakh price range with 1BHK and 2BHK units. These affordable apartment projects typically offer gated community security, landscaped grounds, children's play areas, and proximity to key roads and metro stations. Many qualify for PMAY Credit Linked Subsidy Scheme (CLSS), allowing eligible buyers to avail a subsidy of ₹2.67 lakh on their home loan interest — significantly reducing the effective cost. The rental demand for affordable apartments in Gurgaon is also robust, making them attractive as investment assets. With infrastructure improvements rapidly closing the gap between New Gurgaon and the city centre, affordable apartments here represent exceptional long-term value.        </p>
      </div>
    </div>

    {/* FAQ Section */}
    <div className="mt-14">

      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900">
          Frequently Asked Questions
        </h3>

        <p className="mt-2 text-gray-500">
          Everything you need to know before renting a flat in Gurgaon.
        </p>
      </div>

      <div className="space-y-5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ${
                isOpen
                  ? "border-[#9E1C60]/30 shadow-[0_10px_40px_rgba(0,70,255,0.10)]"
                  : "border-gray-200 hover:border-[#9E1C60]/20"
              }`}
            >
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <h4
                  className={`text-base md:text-lg font-semibold transition ${
                    isOpen
                      ? "text-[#9E1C60]"
                      : "text-gray-800"
                  }`}
                >
                  {faq.question}
                </h4>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                    isOpen
                      ? "bg-[#9E1C60] rotate-180"
                      : "bg-[#9E1C60]/10"
                  }`}
                >
                  <ChevronDown
                    size={18}
                    className={`${
                      isOpen
                        ? "text-white"
                        : "text-[#9E1C60]"
                    }`}
                  />
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-gray-100 px-6 py-5 text-gray-600 leading-7 bg-gradient-to-b from-[#9E1C60]/[0.03] to-transparent">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </div>
</section>
</>
  );
}