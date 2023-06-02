import { useRetrieve } from './useRetrieve';
import { keychainKeys } from '../constants/keychainKeys';

export const useUsername = () => {
  return useRetrieve(keychainKeys.username);
};
