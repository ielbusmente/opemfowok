import { CTASection } from "@/components/homepage/CTASection";
import { FeatureSection } from "@/components/homepage/FeatureSection";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HowItWorksSection } from "@/components/homepage/HowItWorksSection";
import { Navbar } from "@/components/homepage/Navbar";

const features = [
  {
    title: "Profile-based matching",
    description:
      "Your resume and preferences guide every recommendation so the roles feel relevant from the start.",
  },
  {
    title: "Company research in minutes",
    description:
      "Get a structured company brief before you apply, including tech stack, culture, and interview talking points.",
  },
  {
    title: "One clean workflow",
    description:
      "Discover jobs, review fit, and prepare your next application without bouncing across tabs.",
  },
];

const steps = [
  {
    title: "Create your profile",
    description: "Add your experience, skills, and preferred roles once so every recommendation stays aligned.",
  },
  {
    title: "Discover strong matches",
    description: "Search for tech roles and let the assistant score each opportunity against your background.",
  },
  {
    title: "Apply with confidence",
    description: "Review the company dossier and move into your next application with the right context.",
  },
];

const stats = [
  { label: "Roles discovered", value: "4.8k+" },
  { label: "Prep time saved", value: "90%" },
  { label: "Average fit score", value: "78" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar
        brandName="Opemfowok"
        links={[
          { label: "Features", href: "#features" },
          { label: "How it works", href: "#how-it-works" },
          { label: "About", href: "#about" },
        ]}
        ctaLabel="Start for free"
        ctaHref="/login"
      />

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 lg:px-8 lg:py-8">
        <HeroSection
          badge="AI-powered job hunting assistant"
          heading="Discover relevant roles and get ready to apply faster."
          body="Opemfowok finds promising opportunities, scores them against your experience, and builds a company brief so you can move from discovery to application with confidence."
          primaryCtaLabel="Get started"
          primaryCtaHref="/login"
          secondaryCtaLabel="See how it works"
          secondaryCtaHref="#how-it-works"
          stats={stats}
          imageSrc="/images/dashboard-demo.png"
          imageAlt="Opemfowok dashboard preview"
        />

        <section id="features" className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <FeatureSection
            eyebrow="Why it helps"
            heading="A focused workflow for job seekers who want better matches."
            body="The experience centers on your profile, your goals, and the next best action so you can spend less time sorting and more time applying."
            items={features}
          />

          <HowItWorksSection
            eyebrow="How it works"
            heading="Three simple steps from profile to application."
            steps={steps}
            imageSrc="/images/jobs-lists.png"
            imageAlt="Job results preview"
          />
        </section>

        <CTASection
          eyebrow="Built for focused job seekers"
          heading="Turn your next search into a clearer, faster decision."
          body="From profile setup to company research, every step is designed to help you move from possibility to prepared application with less friction."
          ctaLabel="Create your account"
          ctaHref="/login"
        />
      </main>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-text-secondary lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Opemfowok. Built for modern job seekers.</p>
          <div className="flex gap-4">
            <a href="#features" className="transition hover:text-accent">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-accent">
              How it works
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
