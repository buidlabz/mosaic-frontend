import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  return (
    <section className="py-20 bg-[#00FF00] text-black">
       <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="max-w-xl mx-auto mb-8 font-medium opacity-80">Be the first to know about new features, token launches, and partnership announcements.</p>
          
          <div className="max-w-md mx-auto flex gap-2">
             <Input type="email" placeholder="Enter your email" className="bg-white/90 border-0 h-12 text-black placeholder:text-zinc-500" />
             <Button className="h-12 bg-black text-white hover:bg-zinc-800 font-bold px-8">Subscribe</Button>
          </div>
       </div>
    </section>
  );
}
