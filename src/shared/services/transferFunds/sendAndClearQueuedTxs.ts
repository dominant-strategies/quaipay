import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getQuaisProvider } from '../getQuaisProvider';
import { retrieveWallet } from '../retrieveWallet';
import { quais } from 'quais';

const sendAndClearQueuedTxs = async () => {
  const provider = getQuaisProvider();
  const walletData = await retrieveWallet();
  const wallet = new quais.Wallet(walletData.privateKey, provider);

  const jsonValue = await AsyncStorage.getItem('@pending_transactions');
  const transactions = jsonValue ? JSON.parse(jsonValue) : [];

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];
    const isSuccessful =
      transaction.hash && (await checkTransactionStatus(transaction.hash));

    if (!isSuccessful) {
      try {
        const tx = await wallet.sendTransaction(transaction);
        transactions[i].hash = tx.hash;
        await AsyncStorage.setItem(
          '@pending_transactions',
          JSON.stringify(transactions),
        );
      } catch (error) {
        console.log('Transaction retry failed:', error);
      }
    } else {
      transactions.splice(i, 1);
      await AsyncStorage.setItem(
        '@pending_transactions',
        JSON.stringify(transactions),
      );
    }
  }
};

const checkTransactionStatus = async (transactionHash: string) => {
  const provider = getQuaisProvider();
  const receipt = await provider.getTransactionReceipt(transactionHash);
  return receipt && receipt.status === 1;
};

BackgroundTimer.runBackgroundTimer(() => {
  sendAndClearQueuedTxs();
}, 30 * 1000);
