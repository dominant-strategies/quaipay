import { useEffect } from 'react';

import { useWalletContext } from '../context/walletContext';

export const useEntropy = (showError = false) => {
  const { entropy, getEntropy } = useWalletContext();

  useEffect(() => {
    if (!entropy) {
      getEntropy(showError);
    }
  }, [entropy]);

  return entropy;
};
