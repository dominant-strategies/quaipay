import { retrieveStoredItem } from './keychain';
import { keychainKeys } from '../constants/keychainKeys';

export const getZone = () =>
  // location: string
  keychainKeys['wallet-zone-0-0'];

export const retrieveWallet = async () => {
  // TODO: use location when getWalletKey is updated
  // const location = await retrieveStoredItem('location');
  const walletKey = getZone();
  // location
  const retrievedWallet = await retrieveStoredItem(walletKey);
  return JSON.parse(retrievedWallet);
};
