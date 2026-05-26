import AffordableApartmentsBlog from "./AffordableApartmentsBlog";
import AffordableFAQ from "./AffordableFAQ";

export const metadata = {
  title: "Affordable Apartments in India | Budget-Friendly Flats & Homes",
  description:
    "Find affordable apartments in India with modern amenities and prime locations. Explore budget-friendly flats for sale and rent with the best deals and offers.",
  keywords: [
    "affordable apartments",
    "budget flats",
    "cheap apartments India",
    "low cost housing",
    "flats for sale",
    "apartments for rent",
  ],
    alternates: {
    canonical: "https://www.affordableapartmentsingurgaon.com/how-it-works",
  },
};

export default function Page() {
  return (
    <>
      <AffordableApartmentsBlog />
      <AffordableFAQ />
    </>
  );
}