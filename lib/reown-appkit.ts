import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import {  base, mainnet } from "@reown/appkit/networks"
import type { AppKitNetwork } from "@reown/appkit/networks"

const projectId =
  process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || "e6c65ee291a6a50322aca3b33071d96d"

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
