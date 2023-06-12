import { retrieveWallet } from './retrieveWallet';
import { quais } from 'quais';
import { getQuaisProvider } from './getQuaisProvider';

export const transferFunds = async (to: string, amount: string) => {
  const walletData = await retrieveWallet();

  const provider = getQuaisProvider();
  await provider.ready;

  const valueToTransferInWei = quais.utils.parseEther(amount);

  const wallet = new quais.Wallet(walletData.privateKey, provider);
  const tx = { to, value: valueToTransferInWei };

  const txResponse = await wallet.sendTransaction(tx);
  console.log('Transaction hash: ', txResponse);
};
