import { Wallet, Zone } from 'src/shared/types';
import { SnackBarInfo } from 'src/shared/context/snackBarContext';
import { TFunction } from 'i18next';
import { getBalance } from 'src/shared/services/blockscout';
import { quais } from 'quais';

export async function updateBalances(
  walletObject: Record<Zone, Wallet>,
  zone: Zone,
  showSnackBar: (info: SnackBarInfo) => void,
  t: TFunction<'translation', undefined>,
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
      showSnackBar({
        message: t('common.error'),
        moreInfo: t('wallet.getBalanceError') || '',
        type: 'error',
      });
      return { address: address, balance: '0.00' };
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
    .finally(() => setLoading(false));
}
