import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { Opportunities } from "@/components/sections/Opportunities";
import { About } from "@/components/sections/About";
import {
  about,
  footer,
  hero,
  navItems,
  opportunities,
  statistics,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <Navbar items={navItems} />
      <main id="top">
        <Hero content={hero} />

        <div className="mt-14 sm:mt-20">
          <StatsBar stats={statistics} />
        </div>

        {/* Opportunities + About share a band, matching the reference layout. */}
        <div className="mx-auto mt-16 max-w-[1400px] px-5 sm:mt-24 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_1fr]">
            <Opportunities opportunities={opportunities} />
            <About content={about} />
          </div>
        </div>
      </main>
      <Footer content={footer} />
    </>
  );
}
