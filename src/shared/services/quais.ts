import { quais } from 'quais';

import { allNodeData } from 'src/shared/constants/nodeData';
import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';
import { getZone } from './getZone';

export const getBalance = async (address: string) => {
  const zone = getZone();
  const nodeData = allNodeData[zone];
  const provider = new quais.providers.JsonRpcProvider(nodeData.provider);
  await provider.ready;

  const balance = await provider.getBalance(address);
  const balanceInEth = quais.utils.formatEther(balance);

  return {
    balanceInEth,
    balanceInUsd: Number(balanceInEth) * EXCHANGE_RATE,
  };
};
