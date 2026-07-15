
"use client";

import { useEffect, useState } from "react";
import { MapPin, Navigation } from "lucide-react";

export default function NearbyLocations({ blockIndex = 0 }) {
  const [locations, setLocations] = useState([]);

  
   
  useEffect(() => {
  const fetchAreas = async () => {
    try {
      const res = await fetch(
        "https://gurgaon-backend.onrender.com/api/areas/getAllAreas"
      );

      const data = await res.json();

      console.log("FULL RESPONSE =>", data);

      setLocations(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  fetchAreas();
}, []);
const startIndex =
  locations.length > 0
    ? (blockIndex * 10) % locations.length
    : 0;

let visibleLocations = locations.slice(
  startIndex,
  startIndex + 10
);

if (
  locations.length > 0 &&
  visibleLocations.length < 10
) {
  visibleLocations = [
    ...visibleLocations,
    ...locations.slice(0, 10 - visibleLocations.length),
  ];
}

  if (!locations.length) return null;

  return (
   <section className="w-full py-2">
  <div
    className="
      bg-gradient-to-r
      from-[#9E1C60]
      via-[#c21875]
      to-[#ff4da6]
      rounded-[26px]
      overflow-hidden
      shadow-[0_10px_30px_rgba(158,28,96,0.20)]
      border border-pink-300/30
    "
  >

    {/* TOP */}
    <div className="px-5 sm:px-6 pt-5">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-12 h-12
              rounded-2xl
              bg-white/15
              backdrop-blur-md
              flex items-center justify-center
              border border-white/20
            "
          >
            <MapPin className="w-6 h-6 text-white" />
          </div>

          <div>
            <h2
              className="
                text-[16px]
                sm:text-[16px]
                font-bold
                text-white
                leading-tight
              "
            >
              Nearby Locations
            </h2>

            <p className="text-pink-100 text-sm mt-1">
              Explore top nearby property areas
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <button
          className="
            flex items-center gap-2
            px-5 py-1
            rounded-2xl
            bg-white
            text-[#9E1C60]
            font-semibold
            text-sm
            hover:scale-[1.03]
            transition-all duration-300
            shadow-lg
            w-fit
          "
        >
          <Navigation className="w-4 h-4" />
          Explore Areas
        </button>

      </div>
    </div>

    {/* LOCATION CARD */}
    <div className="p-5 sm:p-6">

      <div
        className="
          bg-white
          rounded-[24px]
          p-5
          shadow-xl
          border border-pink-100
        "
      >

        {/* LOCATION LIST */}
        <div className="flex flex-wrap gap-3">

         {visibleLocations.slice(0, 10).map((item) => (

            <button
              key={item._id}
              onClick={() =>
                window.open(
                  `https://www.dealacres.com/properties/affordable-apartments-in-gurgaon`,
                  "_blank"
                )
              }
              className="
                group
                flex items-center gap-1
                px-4 py-1
                rounded-2xl
                bg-pink-50
                border border-pink-100
                hover:bg-[#9E1C60]
                hover:border-[#9E1C60]
                transition-all duration-300
                cursor-pointer
              "
            >

              {/* ICON */}
              <div
                className="
                  w-5 h-5
                  rounded-xl
                  bg-white
                  flex items-center justify-center
                  group-hover:bg-white/20
                  transition-all duration-300
                "
              >
                <MapPin
                  className="
                    w-4 h-4
                    text-[#9E1C60]
                    group-hover:text-white
                    transition-all duration-300
                  "
                />
              </div>

              {/* TEXT */}
              <span
                className="
                  text-sm
                  font-semibold
                  text-[#9E1C60]
                  whitespace-nowrap
                  group-hover:text-white
                  transition-all duration-300
                "
              >
                {item.location}
              </span>

            </button>

          ))}

        </div>

      </div>
    </div>
  </div>
</section>
  );
}