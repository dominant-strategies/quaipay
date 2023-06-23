import axios from 'axios';

export type TransactionList = {
  message: string;
  result: Transaction[];
  status: string;
};

export type Transaction = {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
};

/**
 * Retrieves a list of transactions for a given address.
 * @param address The address to retrieve transactions for.
 * @param sort Optional. The field to sort the transactions by. Can be 'asc' or 'desc'. Defaults to 'desc'.
 * @param page Optional. The page number to retrieve.
 * @param offset Optional. The number of transactions to retrieve per page.
 * @param start_timestamp Optional. The start timestamp to filter transactions by.
 * @param end_timestamp Optional. The end timestamp to filter transactions by.
 * @param filter_by Optional. The field to filter the transactions by. Can be 'from' or 'to'. If not provided, all transactions are returned.
 * @param min_amount Optional. The minimum amount to filter transactions by. The amount is in wei.
 * @param max_amount Optional. The maximum amount to filter transactions by. The amount is in wei.
 * @returns A Promise that resolves with the list of transactions.
 */
export const getAccountTransactions = (
  address: string,
  sort?: string,
  page?: number,
  offset?: number,
  start_timestamp?: number,
  end_timestamp?: number,
  filter_by?: string,
  min_amount?: number,
  max_amount?: number,
): Promise<TransactionList> => {
  address = '0x2f7662cD8E784750E116E44a536278d2b429167E';

  console.log('getAccountTransactions', address, sort);
  return new Promise(async (resolve, reject) => {
    // Get the URL for the API
    const url =
      `https://paxos1.colosseum.quaiscan.io/api?module=account&action=txlist&address=${address}` +
      `${sort ? `&sort=${sort}` : ''}` +
      `${page ? `&page=${page}` : ''}` +
      `${offset ? `&offset=${offset}` : ''}` +
      `${start_timestamp ? `&start_timestamp=${start_timestamp}` : ''}` +
      `${end_timestamp ? `&end_timestamp=${end_timestamp}` : ''}` +
      `${filter_by ? `&filter_by=${filter_by}` : ''}`;

    const config = {
      method: 'get',
      url,
      headers: {
        accept: 'application/json',
      },
    };

    axios
      .request(config)
      .then(response => {
        /**
         * Filter out transactions that are below the minimum amount or above the maximum amount.
         * This is done because the API does not support filtering by amount.
         */
        response.data.result = response.data.result.map((transaction: any) => {
          if (min_amount && Number(transaction.value) < min_amount) {
            return null;
          }
          if (max_amount && Number(transaction.value) > max_amount) {
            return null;
          }
          return transaction;
        });
        response.data.result = response.data.result.filter(
          (transaction: Transaction) => transaction !== null,
        );
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
