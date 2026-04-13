// app/properties/[slug]/loading.js

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8]">

      <div className="flex flex-col items-center gap-6">

        {/* PREMIUM SPINNER */}

        <div className="relative w-16 h-16">

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#9E1C60]/20"></div>

          {/* Spinning Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent 
          border-t-[#9E1C60] border-r-[#ff4da6] animate-spin"></div>

          {/* Inner Glow */}
          <div className="absolute inset-4 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] 
          rounded-full animate-pulse shadow-md"></div>

        </div>

        {/* MAIN TEXT */}

        <p className="font-semibold text-lg tracking-wide 
        bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">
          Loading Apartment Details...
        </p>

        {/* SUB TEXT */}

        <p className="text-sm text-gray-500 text-center max-w-xs">
          Please wait while we fetch complete apartment information and availability.
        </p>

      </div>

    </div>
  );
}