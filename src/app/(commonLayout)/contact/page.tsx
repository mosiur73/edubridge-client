import { ContactFormSection } from "@/components/ContactPage/contact-from";
import { ContactHero } from "@/components/ContactPage/contact-hero";
import { ContactInfoSection } from "@/components/ContactPage/contact-info";
import { ContactSupport } from "@/components/ContactPage/contact-support";


export default function ContactPage() {
  return (
   <div className="min-h-screen">
        <ContactHero></ContactHero>
        <ContactFormSection></ContactFormSection>
        <ContactInfoSection></ContactInfoSection>
        <ContactSupport></ContactSupport>
   </div>
  );
}