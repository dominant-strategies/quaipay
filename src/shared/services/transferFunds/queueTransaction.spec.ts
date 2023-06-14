import { quais } from 'quais';
import { TxData } from './createAndQueueTx';
import { queueTx } from './queueTx';

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

import AsyncStorage from '@react-native-async-storage/async-storage';

describe('queueTransaction', () => {
  describe('when there are pending txs queued', function () {
    it('returns true when tx was successfully saved to AsyncStorage', async () => {
      const tx1: TxData = { to: '0x123', value: quais.utils.parseEther('1') };
      const stringifiedTx1 = JSON.stringify([tx1]);
      const tx2: TxData = { to: '0x234', value: quais.utils.parseEther('2') };
      const stringifiedTxs = JSON.stringify([tx1, tx2]);
      // @ts-ignore
      AsyncStorage.getItem.mockImplementation(() => stringifiedTx1);
      const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');

      const queueTxPromise = queueTx(tx2);

      await expect(queueTxPromise).resolves.toBe(true);
      expect(setItemSpy).toHaveBeenCalledWith(
        '@pending_transactions',
        stringifiedTxs,
      );
    });
  });

  describe('when there are no pending txs', function () {
    it('returns true when tx was successfully saved to AsyncStorage', async () => {
      const tx: TxData = { to: '0x123', value: quais.utils.parseEther('1') };
      const stringifiedTx = JSON.stringify([tx]);

      // @ts-ignore
      AsyncStorage.getItem.mockImplementation(() => undefined);
      const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');

      const queueTxPromise = queueTx(tx);

      await expect(queueTxPromise).resolves.toBe(true);
      expect(setItemSpy).toHaveBeenCalledWith(
        '@pending_transactions',
        stringifiedTx,
      );
    });
  });

  it('returns false when tx could not be saved to AsyncStorage', async () => {
    const tx: TxData = { to: '0x123', value: quais.utils.parseEther('1') };
    // @ts-ignore
    AsyncStorage.getItem.mockImplementation(() => undefined);
    // @ts-ignore
    AsyncStorage.setItem.mockImplementation(() => {
      throw new Error();
    });

    const queueTxPromise = queueTx(tx);

    await expect(queueTxPromise).resolves.toBe(false);
  });
});
