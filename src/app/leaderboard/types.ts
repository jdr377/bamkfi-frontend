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
  