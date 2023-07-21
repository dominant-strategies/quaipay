import { Region } from '../assets/regions';
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

const domainNameUrlMap: Record<DomainName, string> = {
  [DomainName.PRIME]: 'prime',
  [DomainName.CYPRUS]: 'cyprus',
  [DomainName.PAXOS]: 'paxos',
  [DomainName.HYDRA]: 'hydra',
  [DomainName.CYPRUS01]: 'cyprus1',
  [DomainName.CYPRUS02]: 'cyprus2',
  [DomainName.CYPRUS03]: 'cyprus3',
  [DomainName.PAXOS01]: 'paxos1',
  [DomainName.PAXOS02]: 'paxos2',
  [DomainName.PAXOS03]: 'paxos3',
  [DomainName.HYDRA01]: 'hydra1',
  [DomainName.HYDRA02]: 'hydra2',
  [DomainName.HYDRA03]: 'hydra3',
};

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
  name: DomainName;
}

export interface AllNodeData {
  [key: string]: NodeData;
}

const getNodeDataContentFromDomainName = (
  domainName: DomainName,
): NodeData => ({
  url: `wss://rpc.${domainNameUrlMap[domainName]}.colosseum.quaiscan.io`,
  provider: `https://rpc.${domainNameUrlMap[domainName]}.colosseum.quaiscan.io`,
  name: domainName,
});

const zoneNodeData = (Object.keys(Zone) as Zone[]).reduce(
  (acc, zone) => ({
    ...acc,
    [zone]: getNodeDataContentFromDomainName(zoneDomainNameMap[zone]),
  }),
  {} as Record<Region, NodeData>,
);

export const allNodeData: AllNodeData = {
  prime: getNodeDataContentFromDomainName(DomainName.PRIME),
  'region-0': getNodeDataContentFromDomainName(DomainName.CYPRUS),
  'region-1': getNodeDataContentFromDomainName(DomainName.PAXOS),
  'region-2': getNodeDataContentFromDomainName(DomainName.HYDRA),
  ...zoneNodeData,
};
