import { entropyToMnemonic, mnemonicToEntropy } from 'bip39';

export const getSeedPhraseFromEntropy = (entropy?: Uint8Array) => {
  if (!entropy) {
    return undefined;
  }

  try {
    const hexEntropy = Buffer.from(entropy).toString('hex');
    const mnemonic = entropyToMnemonic(hexEntropy);
    return mnemonic;
  } catch {
    return undefined;
  }
};

export const getEntropyFromSeedPhrase = (seedPhrase?: string) => {
  if (!seedPhrase) {
    return undefined;
  }
  try {
    const hexEntropy = mnemonicToEntropy(seedPhrase);
    const entropy = Uint8Array.from(Buffer.from(hexEntropy, 'hex'));

    return entropy;
  } catch {
    return undefined;
  }
};
