import {
  getAccountTransactions,
  Recipient,
  Transaction,
} from 'src/shared/services/blockscout';
import { filterByAmountAndTxDirection } from 'src/main/wallet/utils/filterByAmountAndTxDirection';
import { abbreviateAddress } from 'src/shared/services/quais';
import { Contact, Wallet, Zone } from 'src/shared/types';
import { QuaiRate } from 'src/shared/hooks/useQuaiRate';
import { Timeframe } from 'src/shared/services/dateUtil';

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
  transactions: Transaction[],
  setLoading: (value: ((prevState: boolean) => boolean) | boolean) => void,
  selectedTimeframe?: Timeframe,
  selectedTxDirection?: string,
  contacts?: Contact[],
) {
  setLoading(true);
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
        .map(item => {
          const isUserSender =
            item.from.toLowerCase() === wallet.address.toLowerCase();
          const contact = contacts?.find(
            c =>
              c.address.toLowerCase() ===
              (isUserSender ? item.to.toLowerCase() : item.from.toLowerCase()),
          );
          const recipient: Recipient = contact
            ? {
                display: contact.username,
                profilePicture: contact.profilePicture,
              }
            : {
                display: isUserSender
                  ? abbreviateAddress(item.to)
                  : abbreviateAddress(item.from),
              };

          return {
            ...item,
            recipient,
          };
        });

      txAllShards.push(...filteredTransactions);
    } catch (err) {
      console.log(err);
    }
  });

  Promise.allSettled(promises)
    .then(() => {
      setTransactions([...transactions, ...txAllShards]);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => setLoading(false));
}
