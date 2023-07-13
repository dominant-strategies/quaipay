import { ImageSourcePropType } from 'react-native';

import { Zone } from 'src/shared/types';

export enum Region {
  EAST_ASIA_AND_SOUTHEAST_ASIA = 'East Asia and Southeast Asia',
  INDIA = 'India',
  MIDDLE_EAST = 'Middle East',
  NA_EAST = 'NA East',
  NA_WEST = 'NA West',
  OCEANIA = 'Oceania',
  RUSSIA = 'Russia',
  SOUTH_AMERICA = 'South America',
  WEST_EUROPE = 'West Europe',
}

export const zoneRegionMap: Record<Zone, Region> = {
  'zone-0-0': Region.EAST_ASIA_AND_SOUTHEAST_ASIA,
  'zone-0-1': Region.INDIA,
  'zone-0-2': Region.MIDDLE_EAST,
  'zone-1-0': Region.NA_EAST,
  'zone-1-1': Region.NA_WEST,
  'zone-1-2': Region.OCEANIA,
  'zone-2-0': Region.RUSSIA,
  'zone-2-1': Region.SOUTH_AMERICA,
  'zone-2-2': Region.WEST_EUROPE,
};

export const regionImgs: Record<Region, ImageSourcePropType> = {
  [Region.EAST_ASIA_AND_SOUTHEAST_ASIA]: require('./East_Asia_And_Southeast_Asia.png'),
  [Region.INDIA]: require('./India.png'),
  [Region.MIDDLE_EAST]: require('./Middle_East.png'),
  [Region.NA_EAST]: require('./NA_East.png'),
  [Region.NA_WEST]: require('./NA_West.png'),
  [Region.OCEANIA]: require('./Oceania.png'),
  [Region.RUSSIA]: require('./Russia.png'),
  [Region.SOUTH_AMERICA]: require('./South_America.png'),
  [Region.WEST_EUROPE]: require('./West_Europe.png'),
};
