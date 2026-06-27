
import ListingSection from "./ListingSection";
export async function generateMetadata({ params }) {
  const { propertyType } = await params;

  const bhk = propertyType?.split("-")[0];

  return {
    title: `${bhk} BHK Affordable Apartments in Gurgaon | Verified Flats for Sale`,
    description: `Explore verified ${bhk} BHK affordable apartments in Gurgaon. Find ready-to-move, under-construction, and new launch ${bhk} BHK flats in prime locations with the best prices and expert property assistance.`,
    keywords: [
      `${bhk} BHK flats in Gurgaon`,
      `${bhk} BHK apartments Gurgaon`,
      `Affordable ${bhk} BHK Gurgaon`,
      `${bhk} BHK property Gurgaon`,
      `Buy ${bhk} BHK flat Gurgaon`,
      `Affordable Apartments in Gurgaon`,
    ],
    alternates: {
      canonical: `https://www.affordableapartmentsingurgaon.com/${propertyType}`,
    },
  };
}

export default function Page() {
  return (
    <>
     <ListingSection/>
    </>
  );
}