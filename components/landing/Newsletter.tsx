"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth-service";
import { FormEvent, useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await authService.subscribeToNotifications({ email });
      setMessage(response.message);
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Unable to subscribe right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#00FF00] text-black">
       <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Updated</h2>
          <p className="max-w-xl mx-auto mb-8 font-medium opacity-80">Be the first to know about new features, token launches, and partnership announcements.</p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
             <div className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-white/90 border-0 h-12 text-black placeholder:text-zinc-500"
                />
                <Button type="submit" disabled={loading} className="h-12 bg-black text-white hover:bg-zinc-800 font-bold px-8">
                  {loading ? "Submitting..." : "Subscribe"}
                </Button>
             </div>
             {message && <p className="mt-4 text-sm font-semibold">{message}</p>}
             {error && <p className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
          </form>
       </div>
    </section>
  );
}
