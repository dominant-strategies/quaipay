import { useRetrieve } from './useRetrieve';
import { KeychainKeys } from '../../onboarding/services/constants';

export const useUsername = () => {
  return useRetrieve(KeychainKeys.username);
};
