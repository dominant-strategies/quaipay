import { getZoneIndex } from './getZoneIndex';

describe('getZoneIndex', () => {
  it('should return the correct zone index', () => {
    expect(getZoneIndex(0)).toEqual('wallet-zone-0-0');
    expect(getZoneIndex(5)).toEqual('wallet-zone-1-2');
  });
});
