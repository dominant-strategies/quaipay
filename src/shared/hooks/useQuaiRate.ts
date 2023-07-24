import { useEffect } from 'react';
import { useWalletContext } from '../context/walletContext';

export interface QuaiRate {
  base: number;
  quote: number;
}

export const useQuaiRate = (forceUpdate = false) => {
  const { quaiRate, getQuaiRate } = useWalletContext();

  useEffect(() => {
    if (!quaiRate) {
      getQuaiRate();
    }
  }, []);

  useEffect(() => {
    if (forceUpdate) {
      getQuaiRate();
    }
  }, []);

  return quaiRate;
};
