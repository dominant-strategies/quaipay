import { Transaction } from 'src/shared/services/blockscout';
import { Contact, Wallet, Zone } from 'src/shared/types';
import { QuaiRate } from 'src/shared/hooks/useQuaiRate';
import { Timeframe } from 'src/shared/services/dateUtil';
import { log } from 'src/shared/services/logging';

import { updateTransaction } from './updateTransaction';

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
  setTransactions: (
    value: ((prevState: Transaction[]) => Transaction[]) | Transaction[],
  ) => void,
  setLoading: (value: ((prevState: boolean) => boolean) | boolean) => void,
  selectedTimeframe?: Timeframe,
  selectedTxDirection?: string,
  contacts?: Contact[],
) {
  const txAllShards: Transaction[] = [];

  const promises = shards.map(async shardNumber =>
    updateTransaction({
      shardNumber,
      walletObject,
      filters,
      selectedTimeframe,
      selectedTxDirection,
      amountBounds: {
        min: minAmount,
        max: maxAmount,
      },
      zone,
      quaiRate,
      contacts,
    }).catch(e => {
      log.error(e);
      return undefined;
    }),
  );

  Promise.allSettled(promises)
    .then(() => {
      setTransactions(prevState => [...prevState, ...txAllShards]);
    })
    .catch(err => {
      log.error(err);
    })
    .finally(() => setLoading(false));
}
