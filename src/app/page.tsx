"use client";
import { Features } from "@/features/home/components/features";
import { Hero } from "@/features/home/components/heros";
import { PricingTable } from "@/features/home/components/pricing";
const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Features />
      <PricingTable />
    </div>
  );
}
export default Home;