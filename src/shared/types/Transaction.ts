export type Transaction = {
  accessList: any[];
  chainId: number;
  confirmations: number;
  data: string;
  from: string;
  gasLimit: GasLimit;
  gasPrice: null;
  hash: string;
  maxFeePerGas: GasLimit;
  maxPriorityFeePerGas: GasLimit;
  nonce: number;
  r: string;
  s: string;
  to: string;
  type: number;
  v: number;
  value: GasLimit;
  wait: string[];
};

export type GasLimit = {
  hex: string;
  type: string;
};
