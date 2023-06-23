type TransactionList = {
  message: string;
  result: Transaction[];
  status: string;
};

type Transaction = {
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

    var myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        let transactions: TransactionList = JSON.parse(result);
        transactions.result = transactions.result.filter((transaction: any) => {
          if (min_amount && Number(transaction.value) < min_amount) {
            return false;
          }
          if (max_amount && Number(transaction.value) > max_amount) {
            return false;
          }
          return true;
        });
        resolve(transactions);
      })
      .catch(error => {
        reject(error);
      });
  });
};
