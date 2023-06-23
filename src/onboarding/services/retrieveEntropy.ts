import { retrieveStoredItem } from 'src/shared/services/keychain';

export async function retrieveEntropy() {
  // TODO: remove type casting
  const retrievedEntropy = (await retrieveStoredItem('entropy')) as
    | string
    | false;
  if (retrievedEntropy === false) {
    throw new Error('Entropy not found in keychain');
  }
  return retrievedEntropy;
}
