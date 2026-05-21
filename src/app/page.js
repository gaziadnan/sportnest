import ReviewSection from "@/components/ClientsReview";
import FeaturedFacilities from "@/components/FeaturedFacilities";
import HeroSection from "@/components/HeroSection";
import WhyChooseUs from "@/components/Whychoose";


export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedFacilities />
      <WhyChooseUs />
      <ReviewSection />
      
    </>
  );
}