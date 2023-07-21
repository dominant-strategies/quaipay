import { useEffect } from 'react';
import { useWalletContext } from '../context/walletContext';
import { Zone } from 'src/shared/types';

export const useZone = (): {
  zone: Zone;
} => {
  const { zone, getZone } = useWalletContext();
  useEffect(() => {
    if (!zone) {
      getZone();
    }
  }, [zone]);
  return {
    zone,
  };
};
