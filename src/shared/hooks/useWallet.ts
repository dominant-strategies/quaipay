import { useEffect, useState } from 'react';
import { retrieveWallet } from '../services/retrieveWallet';

export const useWallet = () => {
  const [wallet, setWallet] = useState<any>();
  useEffect(() => {
    const retrieve = async () => {
      const retrievedWallet = await retrieveWallet();
      if (!retrievedWallet) {
        throw new Error('Wallet not found');
      }
      setWallet(retrievedWallet);
    };
    retrieve();
  }, []);
  return wallet;
};
