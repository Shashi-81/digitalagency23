import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { TERMS } from "@/lib/legal";

const TITLE = "Terms of Service — Gipsm Technology";
const DESCRIPTION =
  "The terms that govern your use of Gipsm Technology's website and services.";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/terms-of-service" },
      { property: "og:image", content: "/og/terms-of-service.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Gipsm Technology Terms of Service — The terms that govern use of our website and services." },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og/terms-of-service.jpg" },
      { name: "twitter:image:alt", content: "Gipsm Technology Terms of Service — The terms that govern use of our website and services." },
    ],
    links: [{ rel: "canonical", href: "/terms-of-service" }],
  }),
  component: () => <LegalLayout doc={TERMS} />,
});
