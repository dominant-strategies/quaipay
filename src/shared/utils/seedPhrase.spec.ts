import { generateSecureRandom } from 'react-native-securerandom';

import { getSeedPhraseFromEntropy } from './seedPhrase';

jest.mock('react-native-securerandom', () => {
  return {
    generateSecureRandom: jest.fn((size: number) => {
      let uint8 = new Uint8Array(size);
      uint8 = uint8.map(() => Math.floor(Math.random() * 90) + 10);
      return uint8;
    }),
  };
});

describe('entropyToSeedPhrase', () => {
  describe('with valid entropy', () => {
    it('should create a phrase of 12 words from 16 byte array', async () => {
      const input = await generateSecureRandom(16);
      const output = getSeedPhraseFromEntropy(input);

      expect(output).toBeTruthy();
      expect(output?.split(' ')).toHaveLength(12);
    });
    it('should create a phrase of 24 words from 32 byte array', async () => {
      const input = await generateSecureRandom(32);
      const output = getSeedPhraseFromEntropy(input);

      expect(output).toBeTruthy();
      expect(output?.split(' ')).toHaveLength(24);
    });
  });

  describe('with invalid entropy', () => {
    it('should return a falsy value for empty argument', () => {
      const output = getSeedPhraseFromEntropy();

      expect(output).toBeFalsy();
    });
    it('should return a falsy value for invalid length entropies', async () => {
      const input = await generateSecureRandom(4);
      const output = getSeedPhraseFromEntropy(input);

      expect(output).toBeFalsy();
    });
  });
});
