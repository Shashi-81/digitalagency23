import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { PRIVACY } from "@/lib/legal";

const TITLE = "Privacy Policy — NexaStudio";
const DESCRIPTION =
  "How NexaStudio collects, uses, and protects your personal data. GDPR & CCPA compliant.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/privacy-policy" },
      { property: "og:image", content: "/og/privacy-policy.jpg" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og/privacy-policy.jpg" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: () => <LegalLayout doc={PRIVACY} />,
});
