import { retrieveStoredItem } from './keychain';
import { keychainKeys } from '../constants/keychainKeys';
import { Wallet } from '../types/Wallet';

export const getZone = () =>
  // location: string
  keychainKeys['wallet-zone-1-0'];

export const retrieveWallet = async (): Promise<Wallet | undefined> => {
  // TODO: use location when getWalletKey is updated
  // const location = await retrieveStoredItem('location');
  const walletKey = getZone();
  // location
  const retrievedWallet = await retrieveStoredItem(walletKey);
  if (!retrievedWallet) {
    return undefined;
  }
  return JSON.parse(retrievedWallet);
};
