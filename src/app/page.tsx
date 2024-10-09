"use client";
import { Features } from "@/features/home/components/feature";
import { Hero } from "@/features/home/components/heross";
import { PricingTable } from "@/features/home/components/pricings";
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