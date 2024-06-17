import { configureServerSideSIWE } from 'connectkit-next-siwe';
import { mainnet, sepolia } from '@wagmi/core/chains';
import { fallback, http, webSocket } from 'wagmi';

const chain = process.env.NEXT_PUBLIC_ETH_NETWORK === 'mainnet' ? mainnet : sepolia;
const transport = fallback([
  webSocket(
    `wss://${process.env.NEXT_PUBLIC_ETH_NETWORK}.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
  ),
  http(
    `https://${process.env.NEXT_PUBLIC_ETH_NETWORK}.infura.io/v3/${process.env.INFURA_API_KEY}`
  ),
]);

export const siweServer = configureServerSideSIWE({
  config: {
    chains: [chain],
    transports: {
      [chain.id]: transport,
    }
  },
});
