import HeroSection from "@/components/HeroSection";
import CtaSection from "@/components/homepage/CtaSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import JobDiscoverySection from "@/components/homepage/JobDiscoverySection";
import PlansPage from "@/components/plans/PlansPage";
import StatsSection from "@/components/StatsSection";


export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <HeroSection/>
      <StatsSection/>
      <JobDiscoverySection/>
      <FeaturesSection/>
      <PlansPage/>
      <CtaSection/>
    </div>
  );
}
