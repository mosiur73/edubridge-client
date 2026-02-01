import CategoriesSection from "@/components/homepage/CategoriesSection";
import FeaturedTutorsSection from "@/components/homepage/FeaturedTutorsSection";
import HeroSection from "@/components/homepage/HeroSection";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
   <div className="min-h-screen">
          <HeroSection></HeroSection>
          <FeaturedTutorsSection></FeaturedTutorsSection>
          <HowItWorksSection></HowItWorksSection>
          <CategoriesSection></CategoriesSection>
   </div>
  );
}
