import { quais } from 'quais';

import { allNodeData } from 'src/shared/constants/nodeData';

import { CONFIRMATIONS_REQUIRED } from '../constants/quais';
import { Zone } from 'src/shared/types';

export const getProvider = (zone: Zone) => {
  const nodeData = allNodeData[zone];
  return new quais.providers.JsonRpcProvider(nodeData.provider);
};

export const getWebSocketsProvider = (zone: Zone) => {
  const nodeData = allNodeData[zone];
  return new quais.providers.WebSocketProvider(nodeData.url);
};

export const getBalance = async (
  address: string,
  zone: Zone,
  baseRate: number,
) => {
  const provider = getProvider(zone);
  await provider.ready;

  const balance = await provider.getBalance(address);
  const balanceInQuai = quais.utils.formatEther(balance);

  return {
    balanceInQuai: Number(balanceInQuai),
    balanceInUsd: Number(balanceInQuai) * baseRate,
  };
};

export const getGasPrice = async (zone: Zone) => {
  const provider = getProvider(zone);
  await provider.ready;

  const gasPrice = await provider.getGasPrice();

  return {
    gasPriceInWei: gasPrice.toString(),
    gasPriceInGwei: quais.utils.formatUnits(gasPrice, 'gwei'),
  };
};

export const estimateGas = async (to: string, amount: string, zone: Zone) => {
  try {
    const provider = getProvider(zone);
    await provider.ready;

    const valueToTransferInWei = quais.utils.parseEther(amount);

    const tx = {
      to,
      value: valueToTransferInWei,
      // gasPrice: 10000000000000000, // 0,001 ether TODO: take a look at gas price
      gasPrice: await provider.getGasPrice(),
    };

    const gasEstimate = await provider.estimateGas(tx);
    return {
      gasEstimate,
      gasEstimateInGwei: quais.utils.formatUnits(gasEstimate, 'gwei'),
    };
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

// TODO: move to utils/
export const abbreviateAddress = (address?: string) => {
  return address ? `${address.slice(0, 8)}...${address.slice(-8)}` : '';
};

export const waitForTransaction = async (
  txHash: string,
  zone: Zone,
): Promise<quais.providers.TransactionReceipt> => {
  const provider = getWebSocketsProvider(zone);
  await provider.ready;

  const txReceipt = await provider.waitForTransaction(
    txHash,
    CONFIRMATIONS_REQUIRED,
  );

  return txReceipt;
};
