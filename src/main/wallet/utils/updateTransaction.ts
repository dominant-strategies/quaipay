import {
  getAccountTransactions,
  Transaction,
} from 'src/shared/services/blockscout';
import { Contact, Wallet, Zone } from 'src/shared/types';
import { Timeframe } from 'src/shared/services/dateUtil';
import { QuaiRate } from 'src/shared/hooks/useQuaiRate';

import { filterByAmountAndTxDirection } from './filterByAmountAndTxDirection';
import { appendRecipientToTx } from './appendRecipientToTx';
import { log } from 'src/shared/services/logging';

type UpdateTransactionProps = {
  shardNumber: number;
  walletObject?: Record<Zone, Wallet>;
  filters: {
    offset: number;
    page: number;
  };
  selectedTimeframe?: Timeframe;
  selectedTxDirection?: string;
  amountBounds: {
    min: number;
    max: number;
  };
  zone: Zone;
  quaiRate: QuaiRate;
  contacts?: Contact[];
};

export async function updateTransaction({
  shardNumber,
  walletObject,
  filters,
  selectedTimeframe,
  selectedTxDirection,
  amountBounds,
  zone,
  quaiRate,
  contacts,
}: UpdateTransactionProps): Promise<Transaction[] | undefined> {
  const wallet = walletObject?.[zone];
  const zoneShard = Object.values(walletObject as object)[
    shardNumber
  ] as Wallet;
  const address = zoneShard.address;
  try {
    const res = await getAccountTransactions({
      address,
      config: {
        sort: 'desc',
        page: filters.page,
        offset: filters.offset,
        selectedTimeframe,
        filterBy: selectedTxDirection,
      },
      zone,
      quaiRate,
    });

    const filteredTransaction = wallet
      ? res.result
          .filter((tx: Transaction) =>
            filterByAmountAndTxDirection(
              tx,
              amountBounds.min,
              amountBounds.max,
              wallet.address,
              selectedTxDirection,
            ),
          )
          .map(tx => appendRecipientToTx(tx, wallet, contacts))
      : [];

    return filteredTransaction;
  } catch (err) {
    log.error(err);
    throw err;
  }
}
