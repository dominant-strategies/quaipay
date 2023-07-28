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

type TransactionConfig = {
  sort?: string;
  page?: number;
  offset?: number;
  selectedTimeframe?: Timeframe;
  filterBy?: string;
};

export const getAccountTransactions = ({
  address,
  config,
  quaiRate,
  zone,
}: {
  address: string;
  config?: TransactionConfig;
  quaiRate: QuaiRate;
  zone: Zone;
}): Promise<TransactionList> => {
  return new Promise(async (resolve, reject) => {
    const nodeData = allNodeData[zone];
    const startTimestamp =
      config?.selectedTimeframe && getStartTimestamp(config.selectedTimeframe);

    // Get the URL for the API
    const url =
      `${nodeData.provider.replace(
        'rpc.',
        '',
      )}/api?module=account&action=txlist&address=${address}` +
      `${config?.sort ? `&sort=${config.sort}` : ''}` +
      `${config?.page ? `&page=${config.page}` : ''}` +
      `${config?.offset ? `&offset=${config.offset}` : ''}` +
      `${startTimestamp ? `&start_timestamp=${startTimestamp}` : ''}` +
      `${config?.filterBy ? `&filter_by=${config.filterBy}` : ''}`;

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
