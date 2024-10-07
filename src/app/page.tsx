"use client";
import { Features } from "@/features/home/components/Features";
import { Hero } from "@/features/home/components/Hero";
import { PricingTable } from "@/features/home/components/Pricing";
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <Hero />
      <Features />
      <PricingTable />
    </div>
  );
}
