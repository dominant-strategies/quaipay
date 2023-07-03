import { quais } from 'quais';

import { allNodeData } from 'src/shared/constants/nodeData';
import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';

import { getZone } from './retrieveWallet';
import { CONFIRMATIONS_REQUIRED } from '../constants/quais';

export const getProvider = () => {
  const zone = getZone();
  const nodeData = allNodeData[zone];
  const provider = new quais.providers.JsonRpcProvider(nodeData.provider);
  return provider;
};

export const getWebSocketsProvider = () => {
  const zone = getZone();
  const nodeData = allNodeData[zone];
  const provider = new quais.providers.WebSocketProvider(nodeData.url);

  return provider;
};

export const getBalance = async (address: string) => {
  const provider = getProvider();
  await provider.ready;

  const balance = await provider.getBalance(address);
  const balanceInQuai = quais.utils.formatEther(balance);

  return {
    balanceInQuai: Number(balanceInQuai),
    balanceInUsd: Number(balanceInQuai) * EXCHANGE_RATE,
  };
};

export const getGasPrice = async () => {
  const provider = getProvider();
  await provider.ready;

  const gasPrice = await provider.getGasPrice();

  return {
    gasPriceInWei: gasPrice.toString(),
    gasPriceInGwei: quais.utils.formatUnits(gasPrice, 'gwei'),
  };
};

export const estimateGas = async (to: string, amount: string) => {
  try {
    const provider = getProvider();
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

export const abbreviateAddress = (address?: string) => {
  return address ? `${address.slice(0, 8)}...${address.slice(-8)}` : '';
};

export const waitForTransaction = async (
  txHash: string,
): Promise<quais.providers.TransactionReceipt> => {
  // TODO: diagnose the issue with the websocket provider
  const provider = getProvider();
  await provider.ready;

  const txReceipt = await provider.waitForTransaction(
    txHash,
    CONFIRMATIONS_REQUIRED,
  );

  return txReceipt;
};
