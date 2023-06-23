import { getAccountTransactions } from './blockscout';

describe('getAccountTransactions', () => {
  it('should return a Promise that resolves to an array of transactions', async () => {
    const transactions = await getAccountTransactions(
      '0x2f7662cD8E784750E116E44a536278d2b429167E',
    );
    expect(Array.isArray(transactions.result)).toBe(true);
    expect(transactions.status).toBe('1');
    expect(transactions.message).toBe('OK');
  });

  it('should accept optional parameters', async () => {
    const transactions = await getAccountTransactions(
      '0x2f7662cD8E784750E116E44a536278d2b429167E',
      'asc',
      1,
      10,
      1620000000,
      Date.now(),
      'to',
      50000000000000000,
      1000000000000000000,
    );
    expect(Array.isArray(transactions.result)).toBe(true);
    expect(transactions.status).toBe('1');
    expect(transactions.message).toBe('OK');
  });
});
