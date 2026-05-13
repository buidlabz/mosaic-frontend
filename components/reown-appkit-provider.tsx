"use client"

import { createAppKit } from "@reown/appkit/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cookieToInitialState, type Config, WagmiProvider } from "wagmi"
import type { ReactNode } from "react"
import { base, metadata, networks, projectId, wagmiAdapter } from "@/lib/reown-appkit"

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  defaultNetwork: base,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
})

const queryClient = new QueryClient()

export function ReownAppKitProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  )

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
