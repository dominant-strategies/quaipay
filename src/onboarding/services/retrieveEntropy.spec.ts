import { retrieveEntropy } from './retrieveEntropy';
import { entropyToMnemonic, mnemonicToEntropy } from 'bip39';

jest.mock('react-native-keychain', () => {
  const originalModule = jest.requireActual('react-native-keychain');
  return {
    ...originalModule,
    getGenericPassword: jest.fn().mockReturnValue(
      Promise.resolve({
        password:
          'b0fe518edc41e501ad79c1bf9a40294f7d4df991a2e2bc75e70d6bfdc09e2749',
      }),
    ),
  };
});

describe('retrieveEntropy', () => {
  it('retrieves entropy from keychain and decodes it', async () => {
    const knownEntropy = new Uint8Array([
      176, 254, 81, 142, 220, 65, 229, 1, 173, 121, 193, 191, 154, 64, 41, 79,
      125, 77, 249, 145, 162, 226, 188, 117, 231, 13, 107, 253, 192, 158, 39,
      73,
    ]);
    const retrievedEntropy = await retrieveEntropy();
    const mnemonic = entropyToMnemonic(retrievedEntropy);
    console.log(mnemonic);
    const entropyHex = mnemonicToEntropy(mnemonic);
    console.log(entropyHex);
    expect(retrievedEntropy).toEqual(knownEntropy);
  });
});
