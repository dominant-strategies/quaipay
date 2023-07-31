import { useEffect } from 'react';
import { Platform } from 'react-native';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';

import { getAccountTransactions, Transaction } from './blockscout';
import { useWalletContext } from '../context/walletContext';
import { Zone } from '../types';

export const useTransaction = () => {
  const getTransaction = async (): Promise<Transaction | undefined> => {
    try {
      const storedTransaction = await AsyncStorage.getItem('transaction');
      if (storedTransaction) {
        return JSON.parse(storedTransaction);
      }
    } catch (error) {
      console.error('Error while getting transaction:', error);
    }
  };

  const saveTransaction = async (newTransaction: Transaction) => {
    try {
      const serializedTransaction = JSON.stringify(newTransaction);
      await AsyncStorage.setItem('transaction', serializedTransaction);
    } catch (error) {
      console.error('Error while saving transaction:', error);
    }
  };

  return { getTransaction, saveTransaction };
};

export const useBackgroundTimer = () => {
  const { getTransaction, saveTransaction } = useTransaction();
  const { walletObject } = useWalletContext();
  const zones = Object.keys(Zone) as Zone[];

  const checkForNewTransaction = async () => {
    try {
      // get last saved transaction from storage and compare it with the latest transaction
      const transaction = await getTransaction();

      zones.map(async zone => {
        try {
          const transactions = await getAccountTransactions({
            address: walletObject![zone].address,
            zone: Zone[zone],
            config: { page: 1, offset: 1 },
            quaiRate: { base: 1, quote: 1 },
          });

          if (transactions.result.length > 0) {
            const latestTransaction = transactions.result[0];
            if (!transaction || transaction.hash !== latestTransaction.hash) {
              console.log('new transaction', latestTransaction.hash);
              saveTransaction(latestTransaction);
              // TODO: create a util to filter only transfers
              const type =
                latestTransaction.from.toLowerCase() ===
                walletObject![zone].address.toLowerCase()
                  ? 'sent'
                  : 'received';
              const value = Number(latestTransaction.value) / 10 ** 18;
              const message = `You ${type} ${value} QUAIs`;
              displayNotification(message, latestTransaction);
            } else {
              console.log('no new transaction');
            }
          }

          return transactions;
        } catch (error) {
          console.log(`amk boyle hata olur mu ya ${zone}`, error);
        }
      });
    } catch (error) {
      console.error('Error while checking for new transaction:', error);
    }
  };

  const startTimer = () => {
    const OS = Platform.OS;
    if (OS === 'ios') {
      BackgroundTimer.start();
    }

    BackgroundTimer.runBackgroundTimer(checkForNewTransaction, 300000);
  };

  const stopTimer = () => {
    const OS = Platform.OS;
    if (OS === 'ios') {
      BackgroundTimer.stop();
    }
    BackgroundTimer.stopBackgroundTimer();
  };

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  const displayNotification = (message: string, transaction: Transaction) => {
    console.log('displayNotification', transaction.hash);
    notifee.displayNotification({
      title: 'QuaiPay',
      body: message,
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher',
        largeIcon: 'ic_launcher',
      },
    });
  };

  return { startTimer, stopTimer };
};
