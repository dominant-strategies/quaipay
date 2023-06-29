import { retrieveStoredItem } from 'src/shared/services/keychain';

export async function retrieveEntropy() {
  const retrievedEntropy = await retrieveStoredItem('entropy');
  if (!retrievedEntropy) {
    throw new Error('Entropy not found');
  }
  return retrievedEntropy;
}
