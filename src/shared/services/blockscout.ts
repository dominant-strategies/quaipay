import { allNodeData } from '../constants/nodeData';
import { quais } from 'quais';
import { Zone } from 'src/shared/types';
import { QuaiRate } from 'src/shared/hooks/useQuaiRate';
import { getStartTimestamp, Timeframe } from 'src/shared/services/dateUtil';

type TransactionList = {
  message: string;
  result: Transaction[];
  status: string;
};

export type Recipient = {
  display: string;
  profilePicture?: string;
};

export type Transaction = {
  recipient: Recipient;
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
  selectedTimeframe?: Timeframe;
  filterBy?: string;
  minAmount?: number;
  maxAmount?: number;
};

/**
 * Retrieves a list of transactions for a given address.
 * @param props.address The address to retrieve transactions for.
 * @param props.sort Optional. The field to sort the transactions by. Can be 'asc' or 'desc'. Defaults to 'desc'.
 * @param props.page Optional. The page number to retrieve.
 * @param props.offset Optional. The number of transactions to retrieve per page.
 * @param props.startTimestamp Optional. The start timestamp to filter transactions by.
 * @param props.endTimestamp Optional. The end timestamp to filter transactions by.
 * @param props.filterBy Optional. The field to filter the transactions by. Can be 'from' or 'to'. If not provided, all transactions are returned.
 * @param props.minAmount Optional. The minimum amount to filter transactions by. The amount is in wei.
 * @param props.maxAmount Optional. The maximum amount to filter transactions by. The amount is in wei.
 * @returns A Promise that resolves with the list of transactions.
 */
export const getAccountTransactions = (
  props: GetAccountTransactionsProps,
  zone: Zone,
  quaiRate: QuaiRate,
): Promise<TransactionList> => {
  return new Promise(async (resolve, reject) => {
    const { address, sort, page, offset, selectedTimeframe, filterBy } = props;

    const nodeData = allNodeData[zone];
    const startTimestamp =
      selectedTimeframe && getStartTimestamp(selectedTimeframe);

    // Get the URL for the API
    const url =
      `${nodeData.provider.replace(
        'rpc.',
        '',
      )}/api?module=account&action=txlist&address=${address}` +
      `${sort ? `&sort=${sort}` : ''}` +
      `${page ? `&page=${page}` : ''}` +
      `${offset ? `&offset=${offset}` : ''}` +
      `${startTimestamp ? `&start_timestamp=${startTimestamp}` : ''}` +
      `${filterBy ? `&filter_by=${filterBy}` : ''}`;

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
        transactions.result = transactions.result.map(transaction => {
          return {
            ...transaction,
            fiatAmount:
              Number(quais.utils.formatEther(transaction.value)) *
              quaiRate.quote,
            quaiAmount: Number(quais.utils.formatEther(transaction.value)),
          };
        });
        resolve(transactions);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const getBalance = async (address: string, zone: Zone): Promise<any> => {
  let resJson;
  try {
    resJson = await getBalanceFromBlockscout(address, zone);
    if (resJson.error === 'Balance not found') {
      return getBalanceFromNode(address, zone);
    } else {
      return resJson.result;
    }
  } catch (err) {
    console.log(err);
    return getBalanceFromNode(address, zone);
  }
};

async function getBalanceFromBlockscout(address: string, zone: Zone) {
  const nodeData = allNodeData[zone];

  const url = `${nodeData.provider.replace(
    'rpc.',
    '',
  )}/api?module=account&action=eth_get_balance&address=${address}`;

  const myHeaders = new Headers();
  myHeaders.append('accept', 'application/json');

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const res = await fetch(url, requestOptions);
  const resString = await res.text();
  return JSON.parse(resString);
}

async function getBalanceFromNode(address: string, zone: Zone) {
  const nodeData = allNodeData[zone];

  const provider = new quais.providers.JsonRpcProvider(nodeData.provider);
  await provider.ready;

  return await provider.getBalance(address as string);
}
