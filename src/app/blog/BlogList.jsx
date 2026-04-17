"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useBlog } from "@/contextapi/BlogContext";
import Pagination from "@/components/Pagination";

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getFullYear()}`;
};

export default function BlogList() {
  const { blogs, loading, error, page, total, limit, fetchBlogs } = useBlog();

  const handlePageChange = (pageNum) => {
    fetchBlogs(pageNum);

    const section = document.getElementById("blog-section");
    if (section) {
      const yOffset = -80;
      const y =
        section.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="blog-section"
      className="px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto py-12
      bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8]"
    >

      {/* HEADING */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Latest Insights on{" "}
          <span className="bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] bg-clip-text text-transparent">
            Gurgaon Land Investment
          </span>
        </h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore expert guides, market insights, and investment tips for
          buying <strong>residential plots in Gurgaon</strong>.
        </p>

        <div className="w-20 h-1 bg-gradient-to-r from-[#9E1C60] to-[#ff4da6] mx-auto mt-6 rounded-full"></div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center py-24">
          <div className="relative flex items-center justify-center">

            <div className="absolute w-20 h-20 rounded-full 
            bg-[#9E1C60]/20 blur-xl animate-pulse"></div>

            <div className="w-16 h-16 rounded-full border-[5px] border-[#9E1C60]/10"></div>

            <div className="absolute w-16 h-16 rounded-full 
            border-[5px] border-transparent 
            border-t-[#9E1C60] border-r-[#ff4da6] 
            animate-spin"></div>

            <div className="absolute w-3 h-3 bg-[#9E1C60] rounded-full shadow-md"></div>

          </div>
        </div>
      )}

      {/* ERROR */}
      {error && !loading && (
        <div className="text-center py-16 text-red-500">{error}</div>
      )}

      {/* BLOG GRID */}
      {!loading && !error && Array.isArray(blogs) && blogs.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {blogs.map((post, index) => (
              <Link
                href={`/blog/${post?.Slug || post?.slug || ""}`}
                key={post?._id || index}
                className="group bg-white rounded-3xl overflow-hidden 
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_25px_70px_rgba(158,28,96,0.25)]
                border border-[#9E1C60]/10
                transition duration-300 hover:-translate-y-2"
              >

                {/* IMAGE */}
                <div className="overflow-hidden relative">

                  <Image
                    src={
                      post?.HeroImg?.url ||
                      post?.heroImg?.url ||
                      post?.image ||
                      "/fallback.jpg"
                    }
                    unoptimized
                    alt={post?.HeroAltText || post?.alt || "blog image"}
                    width={600}
                    height={350}
                    className="w-full h-56 object-cover 
                    group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <span className="inline-block text-xs font-medium 
                  bg-[#fff1f6] text-[#9E1C60] px-3 py-1 rounded-full mb-3">
                    {post?.Category || post?.category || "General"}
                  </span>

                  <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-3 
                  group-hover:text-[#9E1C60] transition">
                    {post?.Title || post?.title || "No Title"}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {formatDate(post?.Date || post?.date)}
                  </p>

                </div>

              </Link>
            ))}

          </div>

          {/* PAGINATION */}
          <div className="mt-12">
            <Pagination
              totalItems={total}
              itemsPerPage={limit}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* EMPTY */}
      {!loading && !error && Array.isArray(blogs) && blogs.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center py-20">

          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            Blogs Coming Soon 🚀
          </h3>

          <p className="text-gray-500 mt-3 max-w-md">
            We are working on some amazing real estate insights.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 rounded-lg 
            bg-gradient-to-r from-[#ff4da6] to-[#9E1C60] 
            text-white hover:opacity-90 transition shadow-md"
          >
            Refresh
          </button>

        </div>
      )}

    </section>
  );
}