import { allNodeData } from '../constants/nodeData';
import { getZone } from './retrieveWallet';
import { quais } from 'quais';

export const transferFunds = (
  to: string,
  amount: string,
  privateKey: string,
) => {
  return new Promise((resolve, reject) => {
    const zone = getZone();
    const sendNodeData = allNodeData[zone];

    const provider = new quais.providers.JsonRpcProvider(sendNodeData.provider);
    provider.ready.then(() => {
      const valueToTransferInWei = quais.utils.parseEther(amount);

      const wallet = new quais.Wallet(privateKey, provider);
      const tx = {
        to,
        value: valueToTransferInWei,
        gasLimit: 21000,
      };

      wallet
        .sendTransaction(tx)
        .then(txResponse => {
          console.log('Transaction hash: ', txResponse);
          resolve(txResponse);
        })
        .catch(error => {
          console.log('Transaction error: ', error);
          reject(error);
        });
    });
  });
};
