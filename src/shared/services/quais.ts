import { allNodeData } from '../constants/nodeData';
import { getZone } from './retrieveWallet';
import { quais } from 'quais';

const EXCHANGE_RATE = 0.005;

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
