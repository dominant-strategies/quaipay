import { quais } from 'quais';

import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';
import { getQuaisProvider } from './getQuaisProvider';

export const getBalance = async (address: string) => {
  const provider = getQuaisProvider();
  await provider.ready;

  const balance = await provider.getBalance(address);
  const balanceInEth = quais.utils.formatEther(balance);

  return {
    balanceInEth,
    balanceInUsd: Number(balanceInEth) * EXCHANGE_RATE,
  };
};
