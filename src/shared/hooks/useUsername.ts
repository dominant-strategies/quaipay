import { useWalletContext } from 'src/shared/context/walletContext';
import { useEffect } from 'react';

export const useUsername = (): string | undefined => {
  const { username, getUsername } = useWalletContext();
  useEffect(() => {
    if (!username) {
      getUsername();
    }
  }, [username]);
  return username;
};
