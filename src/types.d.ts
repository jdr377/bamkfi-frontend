declare module 'react-fitty' {
    const ReactFitty: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
        children?: React.ReactNode;
        minSize?: number | undefined;
        maxSize?: number | undefined;
        wrapText?: boolean | undefined;
    } & React.RefAttributes<HTMLElement>>;
    export { ReactFitty };
}

export interface UnisatBamkData {
    tick: string;
    symbol: string;
    curPrice: number;
    changePrice: number;
    btcVolume: number;
    amountVolume: number;
    cap: string;
    capUSD: string;
    warning: boolean;
}

export interface Reward {
    address: string;
    amount: number;
}

export interface LeaderboardData {
    rewards: Reward[];
    block: number;
}


export interface BtcPriceData {
    bitcoin: {
        usd: number;
    };
}

export interface ClientSideTableProps {
    unisatBamkData: BamkRuneData;
    leaderboardData: LeaderboardData;
    btcPriceData: BtcPriceData;
    btcBlockHeight?: string;
}

export interface MagicEdenBamkData {
    rune: string;
    runeNumber: number;
    symbol: string;
    ticker: string;
    name: string;
    totalSupply: string;
    formattedTotalSupply: string;
    divisibility: number;
    imageURI: string;
    minOrderSize: number;
    maxOrderSize: number;
    pendingTxnCount: number;
    floorUnitPrice: {
      formatted: string;
      value: string;
    };
    marketCap: number;
    holderCount: number;
    volume: {
      '1d': number;
      '7d': number;
      '30d': number;
      all: number;
    };
    deltaFloor: {
      '1d': number;
      '7d': number;
      '30d': number;
    };
    txnCount: {
      '1d': number;
      '7d': number;
      '30d': number;
    };
  }

export interface NusdRuneData {
    "amount": string,
    "runeid": string,
    "rune": string,
    "spacedRune": string,
    "symbol": string,
}