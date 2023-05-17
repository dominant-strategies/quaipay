import { storeItem } from './keychain';

jest.mock('react-native-keychain', () => {
  const originalModule = jest.requireActual('react-native-keychain');
  return {
    ...originalModule,
    setGenericPassword: jest
      .fn()
      .mockRejectedValueOnce(new Error('Insufficient security level'))
      .mockReturnValueOnce(Promise.resolve(true)),
    getGenericPassword: jest
      .fn()
      .mockReturnValue(Promise.resolve({ password: 'quaiUser' })),
    // had to mock this because the library exports an enum which makes SECURITY_LEVEL.{SECURE_SOFTWARE, SECURE_HARDWARE} undefined
    SECURITY_LEVEL: {
      SECURE_SOFTWARE: 'software',
      SECURE_HARDWARE: 'hardware',
    },
  };
});

describe('storeItem', () => {
  it('should fall back to security level software if hardware is not available', async () => {
    const setGenericPasswordSpy = jest.spyOn(
      require('react-native-keychain'),
      'setGenericPassword',
    );
    await storeItem({ key: 'username', value: 'quaiUser' });
    // @ts-ignore
    expect(setGenericPasswordSpy.mock.calls[1][2].securityLevel).toBe(
      'software',
    );
  });
});
