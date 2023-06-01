import { useRetrieve } from './useRetrieve';
import { KeychainKeys } from '../constants';

export const useProfilePicture = () => {
  return useRetrieve(KeychainKeys.profilePicture);
};
