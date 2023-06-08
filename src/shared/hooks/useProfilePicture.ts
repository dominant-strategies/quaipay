import { keychainKeys } from '../constants/keychainKeys';
import { useAsyncStorage } from './useAsyncStorage';

export const useProfilePicture = () => {
  return useAsyncStorage(keychainKeys.profilePicture);
};
