import { Zone } from '../types';

export enum DomainName {
  PRIME = 'Prime',
  CYPRUS = 'Cyprus',
  PAXOS = 'Paxos',
  HYDRA = 'Hydra',
  CYPRUS01 = 'Cyprus-01',
  CYPRUS02 = 'Cyprus-02',
  CYPRUS03 = 'Cyprus-03',
  PAXOS01 = 'Paxos-01',
  PAXOS02 = 'Paxos-02',
  PAXOS03 = 'Paxos-03',
  HYDRA01 = 'Hydra-01',
  HYDRA02 = 'Hydra-02',
  HYDRA03 = 'Hydra-03',
}

export const zoneDomainNameMap: Record<Zone, DomainName> = {
  [Zone['zone-0-0']]: DomainName.CYPRUS01,
  [Zone['zone-0-1']]: DomainName.CYPRUS02,
  [Zone['zone-0-2']]: DomainName.CYPRUS03,
  [Zone['zone-1-0']]: DomainName.PAXOS01,
  [Zone['zone-1-1']]: DomainName.PAXOS02,
  [Zone['zone-1-2']]: DomainName.PAXOS03,
  [Zone['zone-2-0']]: DomainName.HYDRA01,
  [Zone['zone-2-1']]: DomainName.HYDRA02,
  [Zone['zone-2-2']]: DomainName.HYDRA03,
};

export interface NodeData {
  url: string;
  provider: string;
  name: string;
}

export interface AllNodeData {
  [key: string]: NodeData;
}

export const allNodeData: AllNodeData = {
  prime: {
    url: 'wss://rpc.prime.colosseum.quaiscan.io',
    provider: 'https://rpc.prime.colosseum.quaiscan.io',
    name: 'Prime',
  },
  'region-0': {
    url: 'wss://rpc.cyprus.colosseum.quaiscan.io',
    provider: 'https://rpc.cyprus.colosseum.quaiscan.io',
    name: 'Cyprus',
  },
  'region-1': {
    url: 'wss://rpc.paxos.colosseum.quaiscan.io',
    provider: 'https://rpc.paxos.colosseum.quaiscan.io',
    name: 'Paxos',
  },
  'region-2': {
    url: 'wss://rpc.hydra.colosseum.quaiscan.io',
    provider: 'https://rpc.hydra.colosseum.quaiscan.io',
    name: 'Hydra',
  },
  'zone-0-0': {
    url: 'wss://rpc.cyprus1.colosseum.quaiscan.io',
    provider: 'https://rpc.cyprus1.colosseum.quaiscan.io',
    name: 'Cyprus-01',
  },
  'zone-0-1': {
    url: 'wss://rpc.cyprus2.colosseum.quaiscan.io',
    provider: 'https://rpc.cyprus2.colosseum.quaiscan.io',
    name: 'Cyprus-02',
  },
  'zone-0-2': {
    url: 'wss://rpc.cyprus3.colosseum.quaiscan.',
    provider: 'https://rpc.cyprus3.colosseum.quaiscan.io',
    name: 'Cyprus-03',
  },
  'zone-1-0': {
    url: 'wss://rpc.paxos1.colosseum.quaiscan.io',
    provider: 'https://rpc.paxos1.colosseum.quaiscan.io',
    name: 'Paxos-01',
  },
  'zone-1-1': {
    url: 'wss://rpc.paxos2.colosseum.quaiscan.io',
    provider: 'https://rpc.paxos2.colosseum.quaiscan.io',
    name: 'Paxos-02',
  },
  'zone-1-2': {
    url: 'wss://rpc.paxos3.colosseum.quaiscan.io',
    provider: 'https://rpc.paxos3.colosseum.quaiscan.io',
    name: 'Paxos-03',
  },
  'zone-2-0': {
    url: 'wss://rpc.hydra1.colosseum.quaiscan.io',
    provider: 'https://rpc.hydra1.colosseum.quaiscan.io',
    name: 'Hydra-01',
  },
  'zone-2-1': {
    url: 'wss://rpc.hydra2.colosseum.quaiscan.io',
    provider: 'https://rpc.hydra2.colosseum.quaiscan.io',
    name: 'Hydra-02',
  },
  'zone-2-2': {
    url: 'wss://rpc.hydra3.colosseum.quaiscan.io',
    provider: 'https://rpc.hydra3.colosseum.quaiscan.io',
    name: 'Hydra-03',
  },
};
