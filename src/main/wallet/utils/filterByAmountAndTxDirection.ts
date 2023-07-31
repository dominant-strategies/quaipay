import { Transaction } from 'src/shared/services/blockscout';

export function filterByAmountAndTxDirection(
  tx: Transaction,
  minAmount: number,
  maxAmount: number,
  address?: string,
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
      return tx.from.toLowerCase() === address?.toLowerCase();
    }
    if (selectedTxDirection === 'to') {
      return tx.to.toLowerCase() === address?.toLowerCase();
    }
  }
  return true;
}
