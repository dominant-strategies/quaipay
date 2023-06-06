export type Wallet = {
  privateKey: string;
  publicKey: string;
  parentFingerprint: string;
  fingerprint: string;
  address: string;
  chainCode: string;
  index: number;
  depth: number;
  mnemonic: string | null;
  path: string | null;
};
