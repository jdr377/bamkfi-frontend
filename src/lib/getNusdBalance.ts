import { NUSD_RUNE_NAME } from "./constants";

export type NusdBalance = {
  brc20Balance: number,
  runesBalance: number,
  total: number
}

export async function getNusdBalance(address: string | undefined): Promise<NusdBalance> {
    if (!address) return {
      brc20Balance: 0,
      runesBalance: 0,
      total: 0
    };
    const [brc20Response, runesResponse] = await Promise.all([
        fetch(`${process.env.OPI_BASE_URL}/v1/brc20/get_current_balance_of_wallet?address=${address}&ticker=$NUSD`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.OPI_API_KEY as string}`,
          }}
        ),
        fetch(`${process.env.OPI_BASE_URL}/v1/runes/get_current_balance_of_wallet?address=${address}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.OPI_API_KEY as string}`,
          }}
        )
      ]);
      const brc20Data = await brc20Response.json();
      let brc20Balance = 0;
      if (brc20Data.result) {
        brc20Balance = Number(brc20Data.result.overall_balance) / 10 ** 18
      }
  
      const runesData = await runesResponse.json() as { error: any; result: { rune_name: string; total_balance: number }[] };
      let runesBalance = 0
      if (runesData.result) {
        const value = runesData.result.find((rune) => rune.rune_name === NUSD_RUNE_NAME)?.total_balance
        runesBalance = value && !isNaN(Number(value)) ? Number(value) : 0;
      }
  
      const result = {
        brc20Balance,
        runesBalance,
        total: brc20Balance + runesBalance
      };

      return result
}