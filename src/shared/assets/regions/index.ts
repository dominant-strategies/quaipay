import { ImageSourcePropType } from 'react-native';

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
