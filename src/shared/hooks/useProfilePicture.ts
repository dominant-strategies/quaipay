import { useRetrieve } from './useRetrieve';
import { KeychainKeys } from '../../onboarding/services/constants';

export const useProfilePicture = () => {
  return useRetrieve(KeychainKeys.profilePicture);
};
