import { useWalletContext } from 'src/shared/context/walletContext';
import { useEffect } from 'react';

export const useProfilePicture = (): string | undefined => {
  const { profilePicture, getProfilePicture } = useWalletContext();
  useEffect(() => {
    if (!profilePicture) {
      getProfilePicture();
    }
  }, [profilePicture]);
  return profilePicture;
};
