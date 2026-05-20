import CategoriesSection from "@/components/homepage/CategoriesSection";
import CTASection from "@/components/homepage/CTASection";
import { FAQSection } from "@/components/homepage/FaqSection";
import FeaturedTutorsSection from "@/components/homepage/FeaturedTutorsSection";
import HeroSection from "@/components/homepage/HeroSection";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";
import NewsletterSection from "@/components/homepage/NewsletterSection";
import StatsSection from "@/components/homepage/StatsSection";
import { TestimonialsSection } from "@/components/homepage/testimonials";
import WhyChooseUsSection from "@/components/homepage/WhyChooseUsSection";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
   <div className="min-h-screen">
          <HeroSection></HeroSection>
          <StatsSection></StatsSection>
          <FeaturedTutorsSection></FeaturedTutorsSection>
          <WhyChooseUsSection></WhyChooseUsSection>
          <HowItWorksSection></HowItWorksSection>
          <CategoriesSection></CategoriesSection>
          <TestimonialsSection></TestimonialsSection>
          <NewsletterSection></NewsletterSection>
          <CTASection></CTASection>
          <FAQSection></FAQSection>
   </div>
  );
}


