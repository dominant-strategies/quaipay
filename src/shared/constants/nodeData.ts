export interface NodeData {
  url: string;
  provider: string;
}

export interface AllNodeData {
  [key: string]: NodeData;
}

export const allNodeData: AllNodeData = {
  prime: {
    url: 'wss://rpc.prime.colosseum.quaiscan.io',
    provider: 'https://rpc.prime.colosseum.quaiscan.io',
  },
  'region-0': {
    url: 'wss://rpc.cyprus.colosseum.quaiscan.io',
    provider: 'https://rpc.cyprus.colosseum.quaiscan.io',
  },
  'region-1': {
    url: 'wss://rpc.paxos.colosseum.quaiscan.io',
    provider: 'https://rpc.paxos.colosseum.quaiscan.io',
  },
  'region-2': {
    url: 'wss://rpc.hydra.colosseum.quaiscan.io',
    provider: 'https://rpc.hydra.colosseum.quaiscan.io',
  },
  'wallet-zone-0-0': {
    url: 'wss://rpc.cyprus1.colosseum.quaiscan.io',
    provider: 'https://rpc.cyprus1.colosseum.quaiscan.io',
  },
  'wallet-zone-0-1': {
    url: 'wss://rpc.cyprus2.colosseum.quaiscan.io',
    provider: 'https://rpc.cyprus2.colosseum.quaiscan.io',
  },
  'wallet-zone-0-2': {
    url: 'wss://rpc.cyprus3.colosseum.quaiscan.',
    provider: 'https://rpc.cyprus2.colosseum.quaiscan.io',
  },
  'wallet-zone-1-0': {
    url: 'wss://rpc.paxos1.colosseum.quaiscan.io',
    provider: 'https://rpc.paxos1.colosseum.quaiscan.io',
  },
  'wallet-zone-1-1': {
    url: 'wss://rpc.paxos2.colosseum.quaiscan.io',
    provider: 'https://rpc.paxos2.colosseum.quaiscan.io',
  },
  'wallet-zone-1-2': {
    url: 'wss://rpc.paxos3.colosseum.quaiscan.io',
    provider: 'https://rpc.paxos3.colosseum.quaiscan.io',
  },
  'wallet-zone-2-0': {
    url: 'wss://rpc.hydra1.colosseum.quaiscan.io',
    provider: 'https://rpc.hydra1.colosseum.quaiscan.io',
  },
  'wallet-zone-2-1': {
    url: 'wss://rpc.hydra2.colosseum.quaiscan.io',
    provider: 'https://rpc.hydra2.colosseum.quaiscan.io',
  },
  'wallet-zone-2-2': {
    url: 'wss://rpc.hydra3.colosseum.quaiscan.io',
    provider: 'https://rpc.hydra3.colosseum.quaiscan.io',
  },
};
