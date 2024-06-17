'use client';

import React from 'react';

import { WagmiProvider, createConfig, fallback, http, webSocket } from 'wagmi';
import { mainnet, sepolia } from '@wagmi/core/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { siweClient } from '@/siwe/siweClient';
import { mulish } from '../ui/fonts';

const chain = process.env.NEXT_PUBLIC_ETH_NETWORK === 'mainnet' ? mainnet : sepolia;
const transport = fallback([
  webSocket(
    `wss://${process.env.NEXT_PUBLIC_ETH_NETWORK}.infura.io/ws/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
  ),
  http(
    `https://${process.env.NEXT_PUBLIC_ETH_NETWORK}.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`
  ),
]);
const config = createConfig(
  getDefaultConfig({
    appName: 'Bamk.fi',
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [chain],
    transports: {
      [chain.id]: transport,
    }
  })
)

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <siweClient.Provider>
          <ConnectKitProvider
            debugMode={process.env.NODE_ENV === 'development'}
            options={{
              hideQuestionMarkCTA: true,
              hideNoWalletCTA: true,
              overlayBlur: 1,
              enforceSupportedChains: true,
              embedGoogleFonts: true,
            }}
            theme="midnight"
            customTheme={{
              "--ck-spinner-color": "#f7951d",
              "--ck-font-family": mulish.style.fontFamily,
            }}
          >
            {children}
          </ConnectKitProvider>
        </siweClient.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
