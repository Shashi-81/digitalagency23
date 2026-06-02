import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Contact } from "@/components/sections/Contact";
import { CursorGlow } from "@/components/ui-extra/CursorGlow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NexaStudio — Digital Experiences That Convert" },
      { name: "description", content: "A full-stack design & development studio building brands, products, and growth systems for ambitious teams." },
      { property: "og:title", content: "NexaStudio — Digital Experiences That Convert" },
      { property: "og:description", content: "A full-stack design & development studio building brands, products, and growth systems for ambitious teams." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <WhyUs />
        <Process />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
