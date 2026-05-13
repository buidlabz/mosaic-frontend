import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import {  base, mainnet } from "@reown/appkit/networks"
import type { AppKitNetwork } from "@reown/appkit/networks"

const projectId =
  process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "b56e18d47c72ab683b10814fe9495694"

const metadata = {
  name: "Mosaic Africa",
  description: "Blockchain credit scoring system",
  url: "http://localhost:3000",
  icons: ["http://localhost:3000/logo.png"],
}

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [base, mainnet]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
})

export const supportedWalletNetworks = {
  base: base,
  ethereum: mainnet,
} as const

export { metadata, networks, projectId, wagmiAdapter,  base, mainnet }
