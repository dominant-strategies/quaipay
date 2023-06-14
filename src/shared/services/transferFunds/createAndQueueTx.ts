import { quais } from 'quais';
import { getQuaisProvider } from '../getQuaisProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BigNumber } from '@quais/bignumber';

export type TxData = {
  to: string;
  value: BigNumber;
  hash?: string;
};

export const createAndQueueTx = async (to: string, amount: string) => {
  const provider = getQuaisProvider();
  await provider.ready;

  const valueToTransferInWei = quais.utils.parseEther(amount);

  const tx: TxData = { to, value: valueToTransferInWei };

  let txQueued = await queueTransaction(tx);
  while (!txQueued) {
    txQueued = await queueTransaction(tx);
  }
};

export const queueTransaction = async (
  transactionData: TxData,
): Promise<boolean> => {
  try {
    const stingifiedPendingTransactions = await AsyncStorage.getItem(
      '@pending_transactions',
    );
    let pendingTransactions: TxData[] = [];

    if (stingifiedPendingTransactions) {
      pendingTransactions = JSON.parse(stingifiedPendingTransactions);
      pendingTransactions.push(transactionData);
    } else {
      pendingTransactions.push(transactionData);
    }

    await AsyncStorage.setItem(
      '@pending_transactions',
      JSON.stringify(pendingTransactions),
    );
    return true;
  } catch (e) {
    console.log('Error storing transaction: ', e);
    return false;
  }
};
