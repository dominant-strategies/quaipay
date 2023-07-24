import { useEffect, useState } from 'react';
import { fetchBTCRate } from '../services/coingecko';

interface QuaiRate {
  base: number;
  quote: number;
}

export const useQuaiRate = () => {
  const [rate, setRate] = useState<QuaiRate>();

  useEffect(() => {
    const fetchData = async () => {
      if (!rate) {
        fetchBTCRate().then(r => {
          const mockedRateValue = 1 / (r ?? 0.0000000000001); // We are assuming that 1 Quai = 1/BTC
          setRate({
            base: mockedRateValue,
            quote: 1 / mockedRateValue,
          });
        });
      }
    };

    fetchData();
  }, []);

  return rate;
};
