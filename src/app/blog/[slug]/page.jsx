import React from "react";
import BlogSingle from "./BlogSingle";

// ✅ Helper: Fetch blog data once (for metadata + content)
async function getBlogData(slug) {
  let loading = true;
  let data = null;
  let error = null;

  try {
    console.log("slug =>",slug)
    const res = await fetch(
      `https://gurgaon-backend.onrender.com/blogs/getBlogBySlug/${slug}?domain=www.affordableapartmentsingurgaon.com`,
      {
         cache: "force-cache",
        next: { revalidate: 120 }, // revalidate every 2 minutes
      }
    );

    if (!res.ok) throw new Error("Failed to fetch blog data");

    const json = await res.json();
    
    data = json || null;
  } catch (err) {
    error = err.message || "Unknown error occurred";
    console.log("data =>",error)
  } finally {
    loading = false;
  }

  return { data, error, loading };
}

// ✅ Metadata (uses same API)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getBlogData(slug);
  

  const single = data?.blog;

  if (!single) {
    return {
      title: "",
      description: "",
    };
  }

  return {
    title: single?.MetaTitle || single?.Title || "",
    description:
      single?.MetaDescription ||
      "Read insightful stories and blogs on ",
    alternates: {
      canonical: `www.affordableapartmentsingurgaon.com/blog/${slug}`,
    },
  };
}

// ✅ Main Blog Page (SSR)
export default async function Page({ params }) {
  const { slug } = await params;
  const { data, error, loading } = await getBlogData(slug);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center p-8">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Unable to Load Blog
          </div>
          <div className="text-gray-600">
            Please try again later or contact support if the issue persists.
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 border-2 border-red-500">
        <p className="text-gray-600 text-lg animate-pulse">
          ⏳ Loading blog content...
        </p>
      </div>
    );
  }

  if (!data?.blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white via-[#fff1f6] to-[#fdf2f8] "> 
      <BlogSingle post={data} />
    </div>
  );
}