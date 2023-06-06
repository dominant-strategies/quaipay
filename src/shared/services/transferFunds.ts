import { allNodeData } from '../constants/nodeData';
import { getZone, retrieveWallet } from './retrieveWallet';
import { quais } from 'quais';

export const transferFunds = async (to: string, amount: string) => {
  const zone = getZone();
  const sendNodeData = allNodeData[zone];
  const walletData = await retrieveWallet();

  const provider = new quais.providers.JsonRpcProvider(sendNodeData.provider);
  await provider.ready;

  const valueToTransferInWei = quais.utils.parseEther(amount);

  const wallet = new quais.Wallet(walletData.privateKey, provider);
  const tx = { to, value: valueToTransferInWei };

  const txResponse = await wallet.sendTransaction(tx);
  console.log('Transaction hash: ', txResponse);
};
