import { getQuaisProvider } from '../getQuaisProvider';

export const checkTxStatus = async (transactionHash: string) => {
  const provider = getQuaisProvider();
  const receipt = await provider.getTransactionReceipt(transactionHash);
  return receipt && receipt.status === 1;
};
