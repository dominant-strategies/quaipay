import { retrieveStoredItem } from './keychain';
import buffer from 'buffer';

export async function retrieveEntropy() {
  const retrievedEntropy = await retrieveStoredItem('entropy');
  if (retrievedEntropy === null) {
    throw new Error('Entropy not found in keychain');
  }
  return Uint8Array.from(
    buffer.Buffer.from(retrievedEntropy, 'base64').toString('binary'),
    c => c.charCodeAt(0),
  );
}
