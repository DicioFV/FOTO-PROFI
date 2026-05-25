// src/pages/HomePage.tsx
// CINEVISION AI — CINEMATIC HOME PAGE

import {
  HeroSection,
  TrustedBy,
  BeforeAfterShowcase,
  StylesShowcase,
  HowItWorks,
  Testimonials,
  PricingPreview,
  FinalCTA,
} from '../components/home';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#050507]">
      {/* Hero Section */}
      <HeroSection />

      {/* Trusted By */}
      <TrustedBy />

      {/* Before/After Showcase */}
      <BeforeAfterShowcase />

      {/* Styles Showcase */}
      <StylesShowcase />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing Preview */}
      <PricingPreview />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
}

export default HomePage;
