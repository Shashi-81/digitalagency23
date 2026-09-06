import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { COOKIES } from "@/lib/legal";

const TITLE = "Cookie Policy — Gipsm Technology";
const DESCRIPTION =
  "How Gipsm Technology uses cookies and similar technologies on our website.";

export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/cookie-policy" },
      { property: "og:image", content: "/og/cookie-policy.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Gipsm Technology Cookie Policy — How we use cookies and similar technologies. Manage your preferences." },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: "/og/cookie-policy.jpg" },
      { name: "twitter:image:alt", content: "Gipsm Technology Cookie Policy — How we use cookies and similar technologies. Manage your preferences." },
    ],
    links: [{ rel: "canonical", href: "/cookie-policy" }],
  }),
  component: () => <LegalLayout doc={COOKIES} />,
});
