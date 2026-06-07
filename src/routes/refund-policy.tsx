import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { REFUND } from "@/lib/legal";

const TITLE = "Refund Policy — NexaStudio";
const DESCRIPTION =
  "When refunds are available and how to request one at NexaStudio.";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/refund-policy" },
      { property: "og:image", content: "/og/refund-policy.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "NexaStudio Refund Policy — When refunds are available and how to request one." },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og/refund-policy.jpg" },
      { name: "twitter:image:alt", content: "NexaStudio Refund Policy — When refunds are available and how to request one." },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: () => <LegalLayout doc={REFUND} />,
});
