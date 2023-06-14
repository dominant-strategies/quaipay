import { BigNumber } from '@quais/bignumber';
import { quais } from 'quais';
import { getQuaisProvider } from '../getQuaisProvider';
import { queueTx } from './queueTx';

export type TxData = {
  to: string;
  value: BigNumber;
  hash?: string;
};

export const createAndQueueTx = async (to: string, amount: string) => {
  const provider = getQuaisProvider();
  await provider.ready;

  const valueToTransferInWei = quais.utils.parseEther(amount);

  const tx: TxData = { to, value: valueToTransferInWei };

  let txQueued = await queueTx(tx);
  while (!txQueued) {
    txQueued = await queueTx(tx);
  }
};
