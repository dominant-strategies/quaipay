export interface Mnemonic {
  readonly phrase: string;
  readonly path: string;
  readonly locale: string;
}

export type Wallet = {
  privateKey: string;
  publicKey: string;
  parentFingerprint: string;
  fingerprint: string;
  address: string;
  chainCode: string;
  index: number;
  depth: number;
  mnemonic?: Mnemonic;
  path: string | null;
};
