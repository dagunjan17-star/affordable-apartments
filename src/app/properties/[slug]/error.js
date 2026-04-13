"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  const isNotFound = error?.message === "PROPERTY_NOT_FOUND";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] px-4">
      <div className="w-full max-w-xl bg-white border border-gray-300 p-8">

        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          {isNotFound ? "Property not found" : "Unable to load this property"}
        </h1>

        <p className="text-gray-600 text-sm leading-6 mb-8">
          {isNotFound
            ? "This property may have been removed or is no longer available."
            : "Something went wrong while loading the property. Please try again."}
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={reset}
            className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Try again
          </button>

          <Link
            href="/"
            className="px-6 py-2 border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Go to home
          </Link>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          If the problem continues, this listing may no longer be available.
        </p>
      </div>
    </div>
  );
}