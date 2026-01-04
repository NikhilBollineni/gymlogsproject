import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { AnalyticsSection } from '@/components/landing/AnalyticsSection';
import { FeatureGrid } from '@/components/landing/FeatureGrid';
import { FAQ } from '@/components/landing/FAQ';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen selection:bg-orange-500/30 selection:text-white">
      <Navbar />
      <HeroSection />
      <AnalyticsSection />
      <FeatureGrid />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
