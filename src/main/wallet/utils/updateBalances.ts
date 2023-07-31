import { Wallet, Zone } from 'src/shared/types';
import { getBalance } from 'src/shared/services/blockscout';
import { quais } from 'quais';

import { Balances } from '../WalletScreen';

export async function updateBalances(
  walletObject: Record<Zone, Wallet>,
  zone: Zone,
  handleBalanceUpdate: (value: Balances) => void,
) {
  const balancePromises = Object.keys(walletObject).map(async key => {
    const address = walletObject[key as Zone].address;
    try {
      const res = await getBalance(address, zone);
      const formattedBalance = Number(quais.utils.formatEther(res)).toFixed(3);
      return { zone, balance: formattedBalance };
    } catch (error) {
      throw new Error(
        `Could not get balance for address:${address} and zone: ${zone}`,
      );
    }
  });

  Promise.allSettled(balancePromises)
    .then(results => {
      const updatedBalances = results.reduce((acc, result) => {
        if (result.status === 'fulfilled') {
          const { balance, zone: z } = result.value;
          return {
            ...acc,
            [z]: balance,
          };
        }
        return acc;
      }, {} as Balances);
      handleBalanceUpdate(updatedBalances);
    })
    .catch(err => {
      throw err;
    });
}
