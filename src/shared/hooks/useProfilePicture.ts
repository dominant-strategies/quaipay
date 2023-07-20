import { useEffect } from 'react';
import makeBlockie from 'ethereum-blockies-base64';

import { useWalletContext } from 'src/shared/context/walletContext';
import { Zone } from '../types';

export const useProfilePicture = (): string | undefined => {
  const { profilePicture, getProfilePicture } = useWalletContext();
  useEffect(() => {
    if (!profilePicture) {
      getProfilePicture();
    }
  }, [profilePicture]);
  return profilePicture && checkProfilePictureStringIsZone(profilePicture)
    ? makeBlockie(profilePicture)
    : profilePicture;
};

// Check by indexing Zone enum. If valid, it will be true
const checkProfilePictureStringIsZone = (s: string) =>
  !!Zone?.[s as keyof typeof Zone];
