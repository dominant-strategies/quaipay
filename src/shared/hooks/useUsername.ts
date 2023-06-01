import { useRetrieve } from './useRetrieve';
import { KeychainKeys } from '../constants';

export const useUsername = () => {
  return useRetrieve(KeychainKeys.username);
};
