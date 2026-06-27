import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PropertyProvider } from "@/contextapi/propertycontext"; // ✅ ADD THIS
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { BlogProvider } from "@/contextapi/BlogContext";
import { LocalityProvider } from "@/contextapi/LocalityContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title:
    "Affordable Apartments in Gurgaon | Verified Flats for Sale & Budget Homes",

  description:
    "Discover affordable apartments in Gurgaon with verified listings, budget-friendly prices, and modern amenities. Explore 1 BHK, 2 BHK, 3 BHK, and luxury flats in prime locations including Sohna Road, Dwarka Expressway, Golf Course Road, New Gurgaon, and more.",

  keywords: [
    "Affordable Apartments in Gurgaon",
    "Affordable flats in Gurgaon",
    "Apartments for sale in Gurgaon",
    "Budget flats Gurgaon",
    "Verified flats Gurgaon",
    "Ready to move apartments Gurgaon",
    "New launch apartments Gurgaon",
    "2 BHK flats Gurgaon",
    "3 BHK flats Gurgaon",
    "Luxury apartments Gurgaon",
    "Property in Gurgaon",
    "Homes for sale Gurgaon",
    "Residential apartments Gurgaon",
    "Buy apartment in Gurgaon",
  ],

  alternates: {
    canonical: "https://www.affordableapartmentsingurgaon.com/",
  },

  openGraph: {
    title:
      "Affordable Apartments in Gurgaon | Verified Flats for Sale & Budget Homes",
    description:
      "Find verified affordable apartments in Gurgaon with the best deals. Browse 1 BHK, 2 BHK, 3 BHK, ready-to-move and new launch projects in top Gurgaon locations.",
    url: "https://www.affordableapartmentsingurgaon.com/",
    siteName: "Affordable Apartments in Gurgaon",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Affordable Apartments in Gurgaon | Verified Flats for Sale & Budget Homes",
    description:
      "Browse verified affordable apartments, budget flats, and new launch projects across Gurgaon.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Provider Wrap Start */}
        <PropertyProvider>
          <BlogProvider>
             <LocalityProvider>
          <Navbar />
          {children}
          <ScrollToTop />
          {/* <Toaster position="top-right" reverseOrder={false} /> */}
          <Footer/>
          </LocalityProvider>
          </BlogProvider>
        </PropertyProvider>
        {/* ✅ Provider Wrap End */}
      </body>
    </html>
  );
}