import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { COOKIES } from "@/lib/legal";

const TITLE = "Cookie Policy — NexaStudio";
const DESCRIPTION =
  "How NexaStudio uses cookies and similar technologies on our website.";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/cookie-policy" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: () => <LegalLayout doc={COOKIES} />,
});
