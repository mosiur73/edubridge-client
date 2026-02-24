import { AboutValues } from "@/components/AboutPage/About-Values";
import { AboutMission } from "@/components/AboutPage/AboutMission";
import { AboutHero } from "@/components/AboutPage/HeroSection";

export default function AboutPage() {
  return (
   <div className="min-h-screen">
         <AboutHero></AboutHero>
         <AboutMission></AboutMission>
         <AboutValues></AboutValues>
   </div>
  );
}