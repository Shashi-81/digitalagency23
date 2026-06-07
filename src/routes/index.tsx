import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Stats } from "@/components/sections/Stats";
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
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { FAQS } from "@/lib/faqs";


const TITLE = "NexaStudio — Digital Experiences That Convert";
const DESCRIPTION =
  "A full-stack design & development studio building brands, products, and growth systems for ambitious teams.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og/home.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NexaStudio — Digital experiences that convert. Start a project with our senior design & engineering team." },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og/home.jpg" },
      { name: "twitter:image:alt", content: "NexaStudio — Digital experiences that convert. Start a project with our senior design & engineering team." },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "NexaStudio",
          description: DESCRIPTION,
          url: "/",
          image: "/og/home.jpg",
          priceRange: "$$$",
          areaServed: "Worldwide",
          serviceType: [
            "Brand & Visual Identity",
            "Web Design",
            "Product Design",
            "Web Development",
            "Mobile App Development",
            "Growth & SEO",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
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
        <Stats />
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
      <MobileStickyCta />
    </div>
  );
}

