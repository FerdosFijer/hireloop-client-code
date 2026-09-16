import HeroSection from "@/components/HeroSection";
import JobDiscoverySection from "@/components/homepage/JobDiscoverySection";
import StatsSection from "@/components/StatsSection";


export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <HeroSection/>
      <StatsSection/>
      <JobDiscoverySection/>
    </div>
  );
}
