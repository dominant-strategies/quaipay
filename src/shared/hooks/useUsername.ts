import { keychainKeys } from '../constants/keychainKeys';
import { useAsyncStorage } from './useAsyncStorage';

export const useUsername = () => {
  return useAsyncStorage(keychainKeys.username);
};
