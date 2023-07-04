import { getZoneIndex } from './getZoneIndex';

describe('getZoneIndex', () => {
  it('should return the correct zone index', () => {
    expect(getZoneIndex(0)).toEqual('zone-0-0');
    expect(getZoneIndex(5)).toEqual('zone-1-2');
  });
});
