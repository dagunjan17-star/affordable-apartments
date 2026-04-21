import FilterProperties from "./FilterProperties";
import SidebarEnquiryForm from "@/components/SidebarEnquiryForm";
import Breadcrumb from "@/components/Breadcrumb";
export default async function Page({ params }) {

  const resolvedParams = await params;

  const rawArea = resolvedParams?.area;

// ✅ CLEAN SLUG (IMPORTANT)
const area = rawArea
  ?.replace("affordable-apartments-in-", "")
  ?.replace("-gurgaon", ""); // 🔥 ye line add kar

// slug format → sector-9 → Sector 9
const formattedArea = area
  ?.replace(/-/g, " ")
  .replace(/\b\w/g, (c) => c.toUpperCase());

  return (

    <div className="bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">

<div className="mb-6">
   <Breadcrumb />
  </div>
        {/* HEADING */}

        <div className="mb-16">

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">

            Affordable{" "}
            <span className="bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">
              Apartments
            </span>{" "}
            in {formattedArea || "Gurgaon"}

          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl">
            Explore affordable apartments in {formattedArea || "Gurgaon"} 
            with modern layouts, prime locations, and excellent connectivity 
            for comfortable living and smart investment.
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] mt-6 rounded-full"></div>

        </div>

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT */}

          <div className="lg:col-span-8 space-y-6">

            <FilterProperties area={area} />

          </div>

          {/* RIGHT */}

          <div className="lg:col-span-4">

            <div className="sticky top-24">

              <SidebarEnquiryForm />

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}