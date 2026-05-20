// app/[area]/page.jsx

import PageContent from "@/components/PageContent";
import Listing from "./Listing";

// import PageContent from "@/components/PageContent";

const DOMAIN = "www.affordableapartmentsingurgaon.com";
const BASE_URL = "https://gurgaon-backend.onrender.com";

// Fallback SEO
const FALLBACK_META = {
  title: "Affordable Apartments for Sale in Gurgaon",
  description:
    "Explore affordable apartments for sale in Gurgaon with modern amenities, prime locations, and budget-friendly pricing options.",
};

// Common API Function
const getPageData = async (slug) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/page-content/getPageContent?domain=${DOMAIN}&slug=${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch page data");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Dynamic Metadata
export async function generateMetadata({ params }) {
  const { area } = await params;

  const result = await getPageData(area);

  // Fallback Meta
  if (!result?.success || !result?.data) {
    return {
      title: FALLBACK_META.title,
      description: FALLBACK_META.description,

      alternates: {
        canonical: `https://${DOMAIN}/${area}`,
      },

      openGraph: {
        title: FALLBACK_META.title,
        description: FALLBACK_META.description,
        url: `https://${DOMAIN}/${area}`,
        siteName: DOMAIN,
        locale: "en_IN",
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title: FALLBACK_META.title,
        description: FALLBACK_META.description,
      },

      robots: {
        index: true,
        follow: true,
      },
    };
  }

  const data = result.data;

  const canonicalUrl = `https://${DOMAIN}/${data.slug}`;

  return {
    title: data.metaTitle,
    description: data.metaDescription,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: canonicalUrl,
      siteName: DOMAIN,
      locale: "en_IN",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

// Page Component
export default async function Page({ params }) {
  const { area } = await params;

  const result = await getPageData(area);

  // // Fallback UI
  // if (!result?.success || !result?.data) {
  //   return (
  //     <main>
  //       <h1>{FALLBACK_META.title}</h1>

  //       <p>{FALLBACK_META.description}</p>
  //     </main>
  //   );
  // }

  return (
    <main>
      <Listing slug={area}/>
      <PageContent pageContent={[result?.data?.pageContent]} area={result?.data?.locality} />
    </main>
  );
}