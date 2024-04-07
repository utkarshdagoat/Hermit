import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    metaMask()
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})