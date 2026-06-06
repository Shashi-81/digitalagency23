export type LegalSection = {
  id: string;
  title: string;
  body: string[]; // paragraphs
  highlight?: string; // important callout
  subsections?: { title: string; body: string[] }[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

const LAST_UPDATED = "January 2025";

export const PRIVACY: LegalDoc = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  lastUpdated: LAST_UPDATED,
  intro:
    "We respect your privacy. This page explains what we collect, how we use it, and the rights you have. We follow GDPR, CCPA, and other applicable data-protection laws.",
  sections: [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      body: [
        "We collect information you provide directly (name, email, company, project details when you contact us or sign up to our newsletter) and information collected automatically (IP address, browser type, device, pages viewed, referrer) via cookies and analytics.",
        "We do not knowingly collect data from anyone under 16 years of age.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How We Use It",
      body: [
        "To respond to enquiries and deliver our services, send transactional and (with consent) marketing communications, improve our website and offerings, comply with legal obligations, and protect against fraud and abuse.",
      ],
      highlight:
        "We never sell your personal data. We only share it with vetted processors who help us run the business (e.g. email, analytics, hosting).",
    },
    {
      id: "cookies-we-use",
      title: "Cookies We Use",
      body: [
        "We use a minimal set of cookies: strictly necessary (session, security), analytics (aggregated usage), and preference cookies (theme, locale). You can manage cookies via your browser at any time. See our Cookie Policy for details.",
      ],
    },
    {
      id: "third-party-services",
      title: "Third Party Services",
      body: [
        "We rely on trusted providers including: Google Analytics 4 (analytics), Cloudflare (CDN/security), email delivery providers, scheduling tools like Cal.com, and payment processors when applicable. Each provider has its own privacy policy.",
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      body: [
        "You have the right to: access your data, request correction or deletion, object to or restrict processing, request portability, and withdraw consent at any time. EU/UK users can also lodge a complaint with their local data-protection authority.",
        "To exercise any of these rights, contact us at the address below. We respond within 30 days.",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      body: [
        "We use industry-standard safeguards: TLS in transit, encryption at rest where supported, role-based access, least-privilege principles, and regular security reviews. No system is 100% secure, but we work hard to keep your data safe.",
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      body: [
        "Questions about this policy or your data? Email privacy@nexastudio.com and we will get back to you within one business day.",
      ],
    },
  ],
};

export const TERMS: LegalDoc = {
  slug: "terms-of-service",
  title: "Terms of Service",
  lastUpdated: LAST_UPDATED,
  intro:
    "These Terms govern your use of NexaStudio's website and services. By engaging us or using this site, you agree to be bound by them.",
  sections: [
    {
      id: "services-description",
      title: "Services Description",
      body: [
        "NexaStudio provides design, development, branding, SEO, and AI-integration services as described on this website and in individual project Statements of Work (SOW). The SOW for each engagement controls in case of conflict with this page.",
      ],
    },
    {
      id: "payment-terms",
      title: "Payment Terms",
      body: [
        "Unless otherwise agreed in writing, invoices are due within 14 days of issue. Projects typically require a 50% deposit to kick off, with the balance due before final delivery. Late invoices accrue interest at 1.5% per month or the maximum allowed by law.",
      ],
      highlight:
        "All quoted prices exclude applicable taxes. Payments are non-transferable to other engagements.",
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      body: [
        "Upon full payment, you receive ownership of all final deliverables created specifically for you. We retain the right to display the work in our portfolio and case studies unless you request otherwise in writing.",
        "We retain ownership of pre-existing tools, frameworks, and components we use to deliver projects. You receive a perpetual, royalty-free license to use those within the delivered work.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      body: [
        "We treat all non-public information you share as confidential and use it only to deliver the engagement. We are happy to sign a mutual NDA on request before any sensitive material is exchanged.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      body: [
        "To the maximum extent permitted by law, NexaStudio's total liability arising out of any engagement is limited to the fees paid in the 3 months preceding the claim. We are not liable for indirect, incidental, consequential, or punitive damages.",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      body: [
        "Either party may terminate an engagement with 14 days written notice. Upon termination, you pay for all work completed up to the termination date and we hand over work-in-progress files.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law",
      body: [
        "These Terms are governed by the laws of the jurisdiction in which NexaStudio is incorporated. Disputes that cannot be resolved amicably will be submitted to the exclusive jurisdiction of the courts of that jurisdiction.",
      ],
    },
  ],
};

export const COOKIES: LegalDoc = {
  slug: "cookie-policy",
  title: "Cookie Policy",
  lastUpdated: LAST_UPDATED,
  intro:
    "This page explains how NexaStudio uses cookies and similar technologies on our website.",
  sections: [
    {
      id: "what-are-cookies",
      title: "What Are Cookies",
      body: [
        "Cookies are small text files placed on your device when you visit a website. They help sites remember information about your visit, which can make your next visit easier and the site more useful to you.",
      ],
    },
    {
      id: "types-we-use",
      title: "Types We Use",
      body: [
        "Strictly necessary: required for the site to function (e.g. session, security). These cannot be turned off.",
        "Analytics: help us understand how visitors interact with the site so we can improve it (e.g. Google Analytics 4).",
        "Preferences: remember choices like theme or language.",
      ],
    },
    {
      id: "third-party-cookies",
      title: "Third Party Cookies",
      body: [
        "Some cookies are set by third-party services such as Google Analytics, Cal.com (scheduling), and embedded media. We do not control these cookies; please consult the respective provider's policy for details.",
      ],
    },
    {
      id: "how-to-control-cookies",
      title: "How to Control Cookies",
      body: [
        "You can accept or decline non-essential cookies via our cookie banner on first visit. You can also clear or block cookies via your browser settings at any time. Disabling cookies may impair some site functionality.",
      ],
      highlight:
        "To opt out of Google Analytics across all sites, install the official browser add-on at tools.google.com/dlpage/gaoptout.",
    },
    {
      id: "updates-to-policy",
      title: "Updates to Policy",
      body: [
        "We may update this Cookie Policy from time to time. Material changes will be announced on this page with a revised 'Last updated' date.",
      ],
    },
  ],
};

export const REFUND: LegalDoc = {
  slug: "refund-policy",
  title: "Refund Policy",
  lastUpdated: LAST_UPDATED,
  intro:
    "We stand behind the quality of our work. This policy explains when refunds are available and how to request one.",
  sections: [
    {
      id: "refund-eligibility",
      title: "Refund Eligibility",
      body: [
        "Full refunds are available within 7 days of project kickoff if no design or development work has been delivered. Partial refunds may be available thereafter, prorated against work completed.",
      ],
      highlight:
        "Custom milestones, completed sprints, third-party costs (domains, paid plugins, licenses), and rush fees are non-refundable.",
    },
    {
      id: "how-to-request",
      title: "How to Request",
      body: [
        "Email billing@nexastudio.com with your project name, invoice number, and a brief description of why you are requesting a refund. We acknowledge requests within one business day.",
      ],
    },
    {
      id: "processing-timeline",
      title: "Processing Timeline",
      body: [
        "Approved refunds are processed within 5-10 business days back to the original payment method. International transfers and certain card issuers may add additional bank processing time.",
      ],
    },
    {
      id: "non-refundable-items",
      title: "Non-Refundable Items",
      body: [
        "Discovery and strategy sessions once delivered, completed milestones already approved by you, third-party software/services purchased on your behalf, and rush/expedited delivery fees.",
      ],
    },
    {
      id: "dispute-resolution",
      title: "Dispute Resolution",
      body: [
        "If we cannot agree on a refund, both parties commit to good-faith negotiation before escalating to mediation or the courts of competent jurisdiction (see Terms of Service for governing law).",
      ],
    },
  ],
};

export const LEGAL_DOCS: LegalDoc[] = [PRIVACY, TERMS, COOKIES, REFUND];
