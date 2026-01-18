import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { About } from "@/components/landing/About";
import { CTA } from "@/components/landing/CTA";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Services } from "@/components/landing/Services";
import { Community } from "@/components/landing/Community";
import { Newsletter } from "@/components/landing/Newsletter";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#00FF00] selection:text-black">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <CTA />
        <HowItWorks />
        <Services />
        <Community />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}