import { entropyToMnemonic } from 'bip39';

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
