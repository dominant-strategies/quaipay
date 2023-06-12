import { retrieveStoredItem } from './keychain';
import { Wallet } from '../types/Wallet';
import { getZone } from './getZone';

export const retrieveWallet = async (): Promise<Wallet> => {
  // TODO: use location when getWalletKey is updated
  // const location = await retrieveStoredItem('location');
  const walletKey = getZone();
  // location
  const retrievedWallet = await retrieveStoredItem(walletKey);
  return JSON.parse(retrievedWallet);
};
