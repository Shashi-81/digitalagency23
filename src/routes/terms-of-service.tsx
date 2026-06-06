import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { TERMS } from "@/lib/legal";

const TITLE = "Terms of Service — NexaStudio";
const DESCRIPTION =
  "The terms that govern your use of NexaStudio's website and services.";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/terms-of-service" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/terms-of-service" }],
  }),
  component: () => <LegalLayout doc={TERMS} />,
});
