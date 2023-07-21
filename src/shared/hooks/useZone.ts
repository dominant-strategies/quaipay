import { useEffect } from 'react';
import { useWalletContext } from '../context/walletContext';
import { Zone } from 'src/shared/types';

import { Region, zoneRegionMap } from '../assets/regions';
import { DomainName, zoneDomainNameMap } from '../constants/nodeData';

export const useZone = (): {
  zone: Zone;
  region?: Region;
  domainName?: DomainName;
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
    domainName: zone ? zoneDomainNameMap[zone] : undefined,
  };
};
