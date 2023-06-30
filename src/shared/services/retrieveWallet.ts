import { retrieveStoredItem } from './keychain';
import { keychainKeys } from '../constants/keychainKeys';
import { Wallet } from '../types/Wallet';

export const getZone = () => {};
// TODO: use location when we have a mapping from location to zone
// const location = await retrieveStoredItem('location');

export const retrieveWallet = async (): Promise<Wallet | undefined> => {
  const retrievedWallet = await retrieveStoredItem(keychainKeys.wallet);
  if (!retrievedWallet) {
    throw new Error('Wallet not found');
  }
  // const zone = getZone(location);
  // const wallet = JSON.parse(retrievedWallet)[zone];
  const wallet = JSON.parse(retrievedWallet)['zone-1-0'];
  return JSON.parse(wallet);
};
