import { Region } from '../assets/regions';
import { Zone } from '../types';

export enum ShardName {
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

const shardNameUrlMap: Record<ShardName, string> = {
  [ShardName.PRIME]: 'prime',
  [ShardName.CYPRUS]: 'cyprus',
  [ShardName.PAXOS]: 'paxos',
  [ShardName.HYDRA]: 'hydra',
  [ShardName.CYPRUS01]: 'cyprus1',
  [ShardName.CYPRUS02]: 'cyprus2',
  [ShardName.CYPRUS03]: 'cyprus3',
  [ShardName.PAXOS01]: 'paxos1',
  [ShardName.PAXOS02]: 'paxos2',
  [ShardName.PAXOS03]: 'paxos3',
  [ShardName.HYDRA01]: 'hydra1',
  [ShardName.HYDRA02]: 'hydra2',
  [ShardName.HYDRA03]: 'hydra3',
};

export const zoneShardNameMap: Record<Zone, ShardName> = {
  [Zone['zone-0-0']]: ShardName.CYPRUS01,
  [Zone['zone-0-1']]: ShardName.CYPRUS02,
  [Zone['zone-0-2']]: ShardName.CYPRUS03,
  [Zone['zone-1-0']]: ShardName.PAXOS01,
  [Zone['zone-1-1']]: ShardName.PAXOS02,
  [Zone['zone-1-2']]: ShardName.PAXOS03,
  [Zone['zone-2-0']]: ShardName.HYDRA01,
  [Zone['zone-2-1']]: ShardName.HYDRA02,
  [Zone['zone-2-2']]: ShardName.HYDRA03,
};

export interface NodeData {
  url: string;
  provider: string;
  name: ShardName;
}

export interface AllNodeData {
  [key: string]: NodeData;
}

const getNodeDataContentFromShardName = (shardName: ShardName): NodeData => ({
  url: `wss://rpc.${shardNameUrlMap[shardName]}.colosseum.quaiscan.io/ws`,
  provider: `https://rpc.${shardNameUrlMap[shardName]}.colosseum.quaiscan.io`,
  name: shardName,
});

const zoneNodeData = (Object.keys(Zone) as Zone[]).reduce(
  (acc, zone) => ({
    ...acc,
    [zone]: getNodeDataContentFromShardName(zoneShardNameMap[zone]),
  }),
  {} as Record<Region, NodeData>,
);

export const allNodeData: AllNodeData = {
  prime: getNodeDataContentFromShardName(ShardName.PRIME),
  'region-0': getNodeDataContentFromShardName(ShardName.CYPRUS),
  'region-1': getNodeDataContentFromShardName(ShardName.PAXOS),
  'region-2': getNodeDataContentFromShardName(ShardName.HYDRA),
  ...zoneNodeData,
};
