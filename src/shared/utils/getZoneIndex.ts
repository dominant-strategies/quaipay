export const getZoneIndex = (ind: number) =>
  `wallet-zone-${Math.floor(ind / 3)}-${ind % 3}`;
