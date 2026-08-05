import AboutSection from "./components/AboutSection";
import BlogSection from "./components/BlogSection";
import BrandsSection from "./components/BrandsSection";
import CallSection from "./components/CallSection";
import Carousel from "./components/Carousel";
import ContactForm from "./components/ContactForm";
import ContactSection from "./components/ContactSection";
import CtaSection from "./components/CtaSection";
import Numbers from "./components/Numbers";
import ServicesSection from "./components/ServicesSection";
import HunterAlignment from "./components/HunterAlignment";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // themeColor: 'black',
}


export default function Home() {
  return (
    <main>
      <Carousel/>
      <AboutSection/>
      <ServicesSection/>
      <Numbers/>
      <CtaSection/>
      <ContactSection/>
      <CallSection/>
      <BrandsSection/>
      <HunterAlignment/>
      <BlogSection/>
      <ContactForm/>
      
    </main>
  );
}