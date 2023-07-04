import { allNodeData } from '../constants/nodeData';
import { quais } from 'quais';
import { Zone } from 'src/shared/types';

export const transferFunds = (
  to: string,
  amount: string,
  privateKey: string,
  zone: Zone,
) => {
  return new Promise((resolve, reject) => {
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
