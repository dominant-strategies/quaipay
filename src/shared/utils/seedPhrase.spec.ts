import {
  getEntropyFromSeedPhrase,
  getSeedPhraseFromEntropy,
} from './seedPhrase';

// Phrase generated with bip39 lib
const sampleMnemonic =
  'seed sock milk update focus rotate barely fade car face mechanic mercy';

const invalidPhrase =
  'Fish Squirrel Brave Animal Plant Bicycle Sticky Spatula Eagle Tree Asana Macro';

// Mock fx to test utility
const generateSecureRandom = (size: number) => {
  let uint8 = new Uint8Array(size);
  uint8 = uint8.map(() => Math.floor(Math.random() * 90) + 10);
  return uint8;
};

describe('entropyToSeedPhrase', () => {
  describe('with valid entropy', () => {
    it('should create a phrase of 12 words from 16 byte array', async () => {
      const input = await generateSecureRandom(16);
      const output = getSeedPhraseFromEntropy(
        Buffer.from(input).toString('hex'),
      );

      expect(output).toBeTruthy();
      expect(output?.split(' ')).toHaveLength(12);
    });
    it('should create a phrase of 24 words from 32 byte array', async () => {
      const input = await generateSecureRandom(32);
      const output = getSeedPhraseFromEntropy(
        Buffer.from(input).toString('hex'),
      );

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
      const output = getSeedPhraseFromEntropy(
        Buffer.from(input).toString('hex'),
      );

      expect(output).toBeFalsy();
    });
  });
});

describe('seedPhraseToEntropy', () => {
  it('should work with valid mnemonic phrase', () => {
    const outputLength = Uint8Array.from(
      Buffer.from(getEntropyFromSeedPhrase(sampleMnemonic) ?? '', 'hex'),
    )?.byteLength;

    expect(outputLength).toBe((sampleMnemonic.split(' ').length * 8) / 6);
  });

  it('should be falsy for invalid phrases', () => {
    const output = getEntropyFromSeedPhrase(invalidPhrase);

    expect(output).toBeFalsy();
  });

  describe('along with phrase getter', () => {
    it('should be deterministic', async () => {
      const input = sampleMnemonic;
      const mid = getEntropyFromSeedPhrase(input);
      const output = getSeedPhraseFromEntropy(mid);

      expect(output).toBe(input);
    });
  });
});
