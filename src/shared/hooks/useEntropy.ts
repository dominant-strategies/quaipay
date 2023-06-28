import { useEffect } from 'react';

import { useWalletContext } from '../context/walletContext';

export const useEntropy = () => {
  const { entropy, getEntropy } = useWalletContext();

  useEffect(() => {
    if (!entropy) {
      getEntropy();
    }
  }, [entropy]);

  return entropy;
};
