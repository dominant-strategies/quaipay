import { Mnemonic } from '@quais/hdnode/src.ts';

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
