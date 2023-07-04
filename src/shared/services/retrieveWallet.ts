import { retrieveStoredItem } from './keychain';
import { keychainKeys } from '../constants/keychainKeys';
import { Wallet } from '../types/Wallet';
import { Zone } from 'src/shared/types';

export const retrieveWallet = async (): Promise<
  Record<Zone, Wallet> | undefined
> => {
  const retrievedWallet = await retrieveStoredItem(keychainKeys.wallet);
  if (!retrievedWallet) {
    throw new Error('Wallet not found');
  }

  return JSON.parse(retrievedWallet);
};
