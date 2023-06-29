import { allNodeData } from '../constants/nodeData';
import { getZone } from './retrieveWallet';
import { quais } from 'quais';

type TransactionList = {
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
  fiatAmount: number;
  quaiAmount: number;
};

type GetAccountTransactionsProps = {
  address: string;
  sort?: string;
  page?: number;
  offset?: number;
  start_timestamp?: number;
  end_timestamp?: number;
  filter_by?: string;
  min_amount?: number;
  max_amount?: number;
};

/**
 * Retrieves a list of transactions for a given address.
 * @param props.address The address to retrieve transactions for.
 * @param props.sort Optional. The field to sort the transactions by. Can be 'asc' or 'desc'. Defaults to 'desc'.
 * @param props.page Optional. The page number to retrieve.
 * @param props.offset Optional. The number of transactions to retrieve per page.
 * @param props.start_timestamp Optional. The start timestamp to filter transactions by.
 * @param props.end_timestamp Optional. The end timestamp to filter transactions by.
 * @param props.filter_by Optional. The field to filter the transactions by. Can be 'from' or 'to'. If not provided, all transactions are returned.
 * @param props.min_amount Optional. The minimum amount to filter transactions by. The amount is in wei.
 * @param props.max_amount Optional. The maximum amount to filter transactions by. The amount is in wei.
 * @returns A Promise that resolves with the list of transactions.
 */
export const getAccountTransactions = (
  props: GetAccountTransactionsProps,
): Promise<TransactionList> => {
  return new Promise(async (resolve, reject) => {
    const {
      address,
      sort,
      page,
      offset,
      start_timestamp,
      end_timestamp,
      filter_by,
      min_amount,
      max_amount,
    } = props;

    const zone = getZone();
    const nodeData = allNodeData[zone];

    // Get the URL for the API
    const url =
      `${nodeData.provider.replace(
        'rpc.',
        '',
      )}/api?module=account&action=txlist&address=${address}` +
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
        const transactions: TransactionList = JSON.parse(result);
        const filteredTransactions = transactions.result.filter(
          (transaction: any) => {
            const transactionValue = Number(transaction.value);

            return (
              (!min_amount || transactionValue >= min_amount) &&
              (!max_amount || transactionValue <= max_amount)
            );
          },
        );

        transactions.result = filteredTransactions;
        resolve(transactions);
      })
      .catch(error => {
        reject(error);
      });
  });
};

// TODO: rewrite
export const getBalance = async (address: string): Promise<any> => {
  const zone = getZone();
  const nodeData = allNodeData[zone];

  // Get the URL for the API
  const url = `${nodeData.provider.replace(
    'rpc.',
    '',
  )}/api?module=account&action=eth_get_balance&address=${address}`;
  console.log(url);
  var myHeaders = new Headers();
  myHeaders.append('accept', 'application/json');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  let resJson;
  try {
    const res = await fetch(url, requestOptions);
    const resString = await res.text();
    resJson = JSON.parse(resString);
    if (resJson.error === 'Balance not found') {
      const provider = new quais.providers.JsonRpcProvider(nodeData.provider);
      await provider.ready;

      const balance = await provider.getBalance(address as string);
      console.log({ balance });
      return Number(balance);
    } else {
      return parseInt(resJson.result, 16);
    }
  } catch (err) {
    console.log(err);
    const provider = new quais.providers.JsonRpcProvider(nodeData.provider);
    await provider.ready;

    const balance = await provider.getBalance(address as string);
    console.log({ balance });
    return Number(balance);
  }
};
