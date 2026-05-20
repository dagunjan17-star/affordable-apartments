
import Image from "next/image";
import Hero from "@/components/Hero.jsx"
import Properties from "@/components/Proprtes";
import GurgaonRealEstateSection from "@/components/GurgaonRealEstateSection";
export default function Home() {
  return (
    <>
     <Hero/>
     <Properties/>
          <GurgaonRealEstateSection/>
    </>
  );
}
