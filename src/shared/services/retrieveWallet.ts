import { retrieveStoredItem } from './keychain';
import { KeychainKeys } from '../../onboarding/services/constants';

const getWalletKey = () =>
  // location: string
  KeychainKeys['zone-0-0'];

export const retrieveWallet = async () => {
  // TODO: use location when getWalletKey is updated
  // const location = await retrieveStoredItem('location');
  const walletKey = getWalletKey();
  // location
  const retrievedWallet = await retrieveStoredItem(walletKey);
  return JSON.parse(retrievedWallet);
};
