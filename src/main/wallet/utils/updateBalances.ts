import { Wallet, Zone } from 'src/shared/types';
import { getBalance } from 'src/shared/services/blockscout';
import { quais } from 'quais';

export async function updateBalances(
  walletObject: Record<Zone, Wallet>,
  zone: Zone,
  setBalances: (
    value:
      | ((prevState: Record<string, string>) => Record<string, string>)
      | Record<string, string>,
  ) => void,
  setLoading: (value: ((prevState: boolean) => boolean) | boolean) => void,
) {
  const balancePromises = Object.keys(walletObject).map(async key => {
    const address = walletObject[key as Zone].address;
    try {
      const res = await getBalance(address, zone);
      const formattedBalance = Number(quais.utils.formatEther(res)).toFixed(3);
      return { address: address, balance: formattedBalance };
    } catch (error) {
      throw new Error(
        `Could not get balance for address:${address} and zone: ${zone}`,
      );
    }
  });

  Promise.allSettled(balancePromises)
    .then(results => {
      const updatedBalances: any = {};
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          const { address } = result.value;
          updatedBalances[address] = result.value.balance;
        }
      });
      setBalances(prevBalances => ({
        ...prevBalances,
        ...updatedBalances,
      }));
    })
    .catch(err => {
      throw err;
    })
    .finally(() => setLoading(false));
}
