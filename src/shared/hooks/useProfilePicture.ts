import { useRetrieve } from './useRetrieve';
import { keychainKeys } from '../constants/keychainKeys';

export const useProfilePicture = () => {
  return useRetrieve(keychainKeys.profilePicture);
};
