import { useEffect } from 'react';
import { useWalletContext } from '../context/walletContext';
import { Zone } from 'src/shared/types';

import { Region, zoneRegionMap } from '../assets/regions';
import { ShardName, zoneShardNameMap } from '../constants/nodeData';

export const useZone = (): {
  zone: Zone;
  region?: Region;
  shardName?: ShardName;
} => {
  const { zone, getZone } = useWalletContext();
  useEffect(() => {
    if (!zone) {
      getZone();
    }
  }, [zone]);
  return {
    zone,
    region: zone ? zoneRegionMap[zone] : undefined,
    shardName: zone ? zoneShardNameMap[zone] : undefined,
  };
};
