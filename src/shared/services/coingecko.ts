interface CoinGeckoResponse {
  usd: number;
}

const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

// To get these ids please check the following spreadsheet:
// https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit#gid=0
enum CoinGeckoIds {
  BTC = 'bitcoin',
}
const ids = Object.values(CoinGeckoIds).join(',');

// Rates, being based on USD as Crypto/USD (i.e. BTC/USD), are always
// in base terms of the pair. That means that it represents the amount
// of USD to buy 1 Crypto, when quote rates that represent #Crypto to
// buy 1 USD. Base and quote rates are inverted versions of one another.

// fetchRates returns base rates for the pair Crypto/USD, with "Crypto"
// being the list of ids defined at the top of the file as a const.
export async function fetchRates() {
  const rates: Record<CoinGeckoIds, CoinGeckoResponse> = await fetch(
    COINGECKO_BASE_URL + `/simple/price?ids=${ids}&vs_currencies=usd`,
  ).then(res => res.json());

  return rates;
}

export async function fetchBTCRate() {
  return await fetchRates().then(rates => rates[CoinGeckoIds.BTC].usd);
}
