import { getAccountTransactions } from './blockscout';

describe.skip('getAccountTransactions', () => {
  it('should return a Promise that resolves to an array of transactions', async () => {
    const transactions = await getAccountTransactions({
      address: '0x2f7662cD8E784750E116E44a536278d2b429167E',
    });
    const regex = new RegExp(/^[01]$/);
    expect(regex.test(transactions.status)).toBe(true);
    expect(Array.isArray(transactions.result)).toBe(true);
  });

  it('should accept optional parameters', async () => {
    const transactions = await getAccountTransactions({
      address: '0x2f7662cD8E784750E116E44a536278d2b429167E',
      sort: 'desc',
      page: 1,
      offset: 10,
      startTimestamp: 1620000000,
      endTimestamp: Date.now(),
      filterBy: 'to',
      minAmount: 50000000000000000,
      maxAmount: 1000000000000000000,
    });
    const regex = new RegExp(/^[01]$/);
    expect(regex.test(transactions.status)).toBe(true);
    expect(Array.isArray(transactions.result)).toBe(true);
  });
});
