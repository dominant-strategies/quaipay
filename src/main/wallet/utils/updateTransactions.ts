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
  selectedTimeframe?: Timeframe,
  selectedTxDirection?: string,
  contacts?: Contact[],
) {
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
      throw e;
    }),
  );

  return promises;
}
