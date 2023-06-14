import AsyncStorage from '@react-native-async-storage/async-storage';
import { TxData } from './createAndQueueTx';

export const queueTx = async (transactionData: TxData): Promise<boolean> => {
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
