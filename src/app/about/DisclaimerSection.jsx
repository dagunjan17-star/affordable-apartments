"use client";

import { useState } from "react";

export default function DisclaimerSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="py-6">
      <div className="rounded-3xl bg-white border border-gray-500 p-6 shadow-lg max-w-7xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
          Disclaimer :-
        </h3>

        <p className="text-gray-900 text-sm md:text-base leading-relaxed">
          The property listings, images, descriptions, prices,
          specifications, and other related information displayed on this
          website are collected from publicly available sources,
          third-party websites, property owners, brokers, and other
          external channels...

          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="ml-2 text-green-400 font-semibold hover:text-green-300 transition"
            >
              Read More
            </button>
          )}
        </p>

        {expanded && (
          <>
            <div className="mt-4 space-y-4 text-gray-900 text-sm md:text-base leading-relaxed">
              <p>
                The property listings, images, descriptions, prices, specifications, and other related information displayed on this website are collected from publicly available sources, third-party websites, property owners, brokers, and other external channels. We do not independently verify, validate, or guarantee the accuracy, completeness, authenticity, legality, or availability of any information published on this platform.
              </p>

              <p>
                
The properties displayed on this website are not necessarily listed, owned, managed, represented, or endorsed by us. The information is provided solely for informational and reference purposes.
              </p>

              <p>
               Users are advised to conduct their own due diligence and independently verify all property details, ownership documents, approvals, legal status, pricing, location, and any other relevant information before making any decision, payment, commitment, or transaction
              </p>

              <p>
               We shall not be liable for any loss, damage, dispute, claim, financial loss, misrepresentation, fraud, or inconvenience arising directly or indirectly from the use of, reliance upon, or interpretation of any information available on this website.
              </p>

              <p>
                By accessing and using this website, you acknowledge and agree that any action taken based on the information provided is entirely at your own risk and responsibility.
              </p>
            </div>

            <button
              onClick={() => setExpanded(false)}
              className="mt-4 text-green-400 font-semibold hover:text-green-300 transition"
            >
              Read Less
            </button>
          </>
        )}
      </div>
     
    </section>

  );
}