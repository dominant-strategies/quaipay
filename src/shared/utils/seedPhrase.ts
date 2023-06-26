import { entropyToMnemonic, mnemonicToEntropy } from 'bip39';

export const getSeedPhraseFromEntropy = (entropy?: string) => {
  if (!entropy) {
    return undefined;
  }

  try {
    const mnemonic = entropyToMnemonic(entropy);
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
    return mnemonicToEntropy(seedPhrase);
  } catch {
    return undefined;
  }
};
