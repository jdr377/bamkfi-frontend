'use client'

import { usePathname } from "next/navigation"
import { CustomConnectKitButton } from "../ConnectKitButton"
import { ConnectBtcModal } from "../providers/BtcWalletProvider"

export function Wallets() {
    const pathname = usePathname()
    if (pathname?.startsWith("/swap/mint")) {
        return (
            <CustomConnectKitButton />
        )
    }
    return <ConnectBtcModal />;
}