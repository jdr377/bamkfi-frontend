export interface Reward {
    address: string;
    amount: number;
  }
  
  export interface LeaderboardData {
    rewards: Reward[];
    block: number;
  }
  
  export interface BamkRuneData {
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
  
  export interface BtcPriceData {
    bitcoin: {
      usd: number;
    };
  }
  
  export interface Data {
    leaderboard_data: LeaderboardData;
    bamkRuneData: BamkRuneData;
    btcPriceData: BtcPriceData;
  }  