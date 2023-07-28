import {
  getAccountTransactions,
  Transaction,
} from 'src/shared/services/blockscout';
import { filterByAmountAndTxDirection } from 'src/main/wallet/utils/filterByAmountAndTxDirection';
import { Contact, Wallet, Zone } from 'src/shared/types';
import { QuaiRate } from 'src/shared/hooks/useQuaiRate';
import { Timeframe } from 'src/shared/services/dateUtil';

import { appendRecipientToTx } from './appendRecipientToTx';

export function updateTransactions(
  shards: number[],
  walletObject: Record<Zone, Wallet> | undefined,
  filters: {
    offset: number;
    page: number;
  },
  minAmount: number,
  maxAmount: number,
  zone: Zone,
  quaiRate: QuaiRate,
  wallet: Wallet,
  setTransactions: (
    value: ((prevState: Transaction[]) => Transaction[]) | Transaction[],
  ) => void,
  setLoading: (value: ((prevState: boolean) => boolean) | boolean) => void,
  selectedTimeframe?: Timeframe,
  selectedTxDirection?: string,
  contacts?: Contact[],
) {
  const txAllShards: Transaction[] = [];

  const promises = shards.map(async shard => {
    const zoneShard = Object.values(walletObject as object)[shard];
    const address = zoneShard?.address;
    try {
      const res = await getAccountTransactions(
        {
          address: address || '',
          sort: 'desc',
          page: filters.page,
          offset: filters.offset,
          selectedTimeframe,
          filterBy: selectedTxDirection,
          minAmount,
          maxAmount,
        },
        zone,
        quaiRate,
      );

      const filteredTransactions = res.result
        .filter((tx: Transaction) =>
          filterByAmountAndTxDirection(
            tx,
            minAmount,
            maxAmount,
            wallet,
            selectedTxDirection,
          ),
        )
        .map(tx => appendRecipientToTx(tx, wallet, contacts));

      txAllShards.push(...filteredTransactions);
    } catch (err) {
      console.log(err);
    }
  });

  Promise.allSettled(promises)
    .then(() => {
      setTransactions(prevState => [...prevState, ...txAllShards]);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => setLoading(false));
}
