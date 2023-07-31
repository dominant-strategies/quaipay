import { getAccountTransactions } from './blockscout';
import { Zone } from '../types';

// TODO: restore after each
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () =>
      Promise.resolve(
        JSON.stringify({
          message: 'OK',
          status: '1',
          result: [
            {
              blockHash:
                '0x00001a298f08ed7c7bc64309b641e63bed0a713292692beeb6d8502c5e20941b',
              blockNumber: '86003',
              confirmations: '920',
              contractAddress: '0x0000000000000000000000000000000000000000',
              cumulativeGasUsed: '21000',
              from: '0x6431154cd3d884f56fc19727d27a26f9ef5bd3d7',
              gas: '21000',
              gasPrice: '1000000000',
              gasUsed: '21000',
              hash: '0x55e5c661413ca53fe995b6ecc4e9c32441608cf9d997d9009eef9d71769d0f3e',
              input: '0x',
              isError: '1',
              nonce: '22',
              timeStamp: '1686827688',
              to: '0x2f7662cd8e784750e116e44a536278d2b429167e',
              transactionIndex: '0',
              txreceipt_status: '0',
              value: '2000000000000000000',
            },
          ],
        }),
      ),
  }),
) as any;

describe('getAccountTransactions', () => {
  it('should return a Promise that resolves to an array of transactions', async () => {
    const transactions = await getAccountTransactions({
      address: '0x2f7662cD8E784750E116E44a536278d2b429167E',
      zone: Zone['zone-0-0'],
      quaiRate: { base: 1, quote: 1 },
    });
    const regex = new RegExp(/^[01]$/);
    expect(regex.test(transactions.status)).toBe(true);
    expect(Array.isArray(transactions.result)).toBe(true);
  });

  it('should accept optional parameters', async () => {
    const transactions = await getAccountTransactions({
      address: '0x2f7662cD8E784750E116E44a536278d2b429167E',
      config: {
        sort: 'desc',
        page: 1,
        offset: 10,
        selectedTimeframe: 'Past year',
        filterBy: 'to',
      },
      zone: Zone['zone-0-0'],
      quaiRate: { base: 1, quote: 1 },
    });
    const regex = new RegExp(/^[01]$/);
    expect(regex.test(transactions.status)).toBe(true);
    expect(Array.isArray(transactions.result)).toBe(true);
  });
});
