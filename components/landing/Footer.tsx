import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-zinc-800 text-sm">
       <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
             <div>
                <div className="flex items-center gap-2 mb-4">
                        <Image src="/logo.png" alt="Logo" width={42} height={42} /> 
                   <span className="text-lg font-bold">Mosaic Africa</span>
                </div>
                <p className="text-zinc-500">
                   Building the future of credit scoring and cross-border payments for the African continent and beyond.
                </p>
             </div>
             
             <div>
                <h4 className="font-bold text-white mb-4">Platform</h4>
                <ul className="space-y-2 text-zinc-500">
                   <li><Link href="#" className="hover:text-[#00FF00]">Credit Scoring</Link></li>
                   <li><Link href="#" className="hover:text-[#00FF00]">Swap Engine</Link></li>
                   <li><Link href="#" className="hover:text-[#00FF00]">API Access</Link></li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-zinc-500">
                   <li><Link href="#" className="hover:text-[#00FF00]">About Us</Link></li>
                   <li><Link href="#" className="hover:text-[#00FF00]">Careers</Link></li>
                   <li><Link href="#" className="hover:text-[#00FF00]">Contact</Link></li>
                </ul>
             </div>

             <div>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-zinc-500">
                   <li><Link href="#" className="hover:text-[#00FF00]">Privacy Policy</Link></li>
                   <li><Link href="#" className="hover:text-[#00FF00]">Terms of Service</Link></li>
                </ul>
             </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600">
             <p>© 2026 Mosaic Africa. All rights reserved.</p>
             <div className="flex gap-4">
                <Link href="#" className="hover:text-white">Twitter</Link>
                <Link href="#" className="hover:text-white">LinkedIn</Link>
                <Link href="#" className="hover:text-white">Discord</Link>
             </div>
          </div>
       </div>
    </footer>
  );
}
