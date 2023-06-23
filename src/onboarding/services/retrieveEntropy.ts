import { retrieveStoredItem } from 'src/shared/services/keychain';

export async function retrieveEntropy() {
  const retrievedEntropy = await retrieveStoredItem('entropy');
  // ts-ignore
  if (retrievedEntropy === false) {
    throw new Error('Entropy not found in keychain');
  }
  return retrievedEntropy;
}
