import { getStartTimestamp } from 'src/shared/services/dateUtil';

describe('dateUtil', function () {
  describe('getStartTimestamp', function () {
    it('should return one week ago in unix when passed "This week" as timeframe', function () {
      jest.useFakeTimers().setSystemTime(new Date('2023-07-27T10:00:00.000Z'));
      expect(getStartTimestamp('This week')).toBe(1689847200);
    });
  });
});
