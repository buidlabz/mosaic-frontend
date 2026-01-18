import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconMenu2 } from "@tabler/icons-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Image src="/logo.png" alt="Logo" width={42} height={42} /> 
          <span className="text-xl font-bold tracking-tight">Mosaic Africa</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <Link href="#overview" className="hover:text-[#00FF00] transition-colors">Overview</Link>
          <Link href="#features" className="hover:text-[#00FF00] transition-colors">Features</Link>
          <Link href="#services" className="hover:text-[#00FF00] transition-colors">Services</Link>
          <Link href="/login/institution" className="hover:text-[#00FF00] transition-colors">Institutions</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login/user" className="hidden md:block text-sm font-medium text-white hover:text-[#00FF00]">
            Sign In
          </Link>
          <Link href="/signup">
            <Button className="bg-[#00FF00] text-black hover:bg-[#00DD00] font-semibold rounded-full px-6">
              Get Started
            </Button>
          </Link>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger render={
                <Button variant="ghost" size="icon" className="text-white">
                  <IconMenu2 className="w-6 h-6" />
                </Button>
              } />
              <SheetContent side="right" className="bg-zinc-950 border-zinc-800 text-white pl-4">
                <nav className="flex flex-col gap-6 mt-10">
                  <Link href="#overview" className="text-lg font-medium hover:text-[#00FF00]">Overview</Link>
                  <Link href="#features" className="text-lg font-medium hover:text-[#00FF00]">Features</Link>
                  <Link href="#services" className="text-lg font-medium hover:text-[#00FF00]">Services</Link>
                  <Link href="/login/institution" className="text-lg font-medium hover:text-[#00FF00]">Institutions</Link>
                  <Link href="/login/user" className="text-lg font-medium hover:text-[#00FF00]">Sign In</Link>
                  <Link href="/signup" className="text-lg font-medium hover:text-[#00FF00]">Get Started</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
