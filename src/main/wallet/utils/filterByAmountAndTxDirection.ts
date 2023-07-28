import { Transaction } from 'src/shared/services/blockscout';
import { Wallet } from 'src/shared/types';

export function filterByAmountAndTxDirection(
  tx: Transaction,
  minAmount: number,
  maxAmount: number,
  wallet: Wallet,
  selectedTxDirection?: string,
): boolean {
  if (minAmount && minAmount > 0) {
    return tx.quaiAmount >= minAmount;
  }
  if (maxAmount && maxAmount > 0) {
    return tx.quaiAmount <= maxAmount;
  }
  if (selectedTxDirection) {
    if (selectedTxDirection === 'from') {
      return tx.from.toLowerCase() === wallet?.address?.toLowerCase();
    }
    if (selectedTxDirection === 'to') {
      return tx.to.toLowerCase() === wallet?.address?.toLowerCase();
    }
  }
  return true;
}
