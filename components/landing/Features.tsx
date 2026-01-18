import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconActivity, IconArrowsExchange, IconShieldCheck } from "@tabler/icons-react";

export function Features() {
  return (
    <section id="solutions" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Secure, Efficient <br/>Crypto Credit and Payments</h2>
          <p className="text-zinc-400 text-lg">Build credit with blockchain data and swap currencies without borders using our advanced infrastructure.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-black border-zinc-800 hover:border-[#00FF00]/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00FF00] transition-colors">
                <IconActivity className="w-6 h-6 text-white group-hover:text-black" />
              </div>
              <CardTitle className="text-xl">Blockchain Credit Scoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">Analyze wallet activity for scores 0-100. Track history via API/SDK for seamless lending integrations.</p>
            </CardContent>
          </Card>

          <Card className="bg-black border-zinc-800 hover:border-[#00FF00]/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00FF00] transition-colors">
                <IconArrowsExchange className="w-6 h-6 text-white group-hover:text-black" />
              </div>
              <CardTitle className="text-xl">Cross-Border Swaps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">Auto-convert USDT to KES, UGX, and USD. Integrate with local wallets and mobile money providers instantly.</p>
            </CardContent>
          </Card>

          <Card className="bg-black border-zinc-800 hover:border-[#00FF00]/50 transition-colors group">
            <CardHeader>
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#00FF00] transition-colors">
                <IconShieldCheck className="w-6 h-6 text-white group-hover:text-black" />
              </div>
              <CardTitle className="text-xl">No Hidden Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">Transparent transactions with real-time tracking. Earn rewards for maintaining vital credit activity.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
