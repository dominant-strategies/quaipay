import { retrieveEntropy } from './retrieveEntropy';

jest.mock('react-native-keychain', () => {
  const originalModule = jest.requireActual('react-native-keychain');
  return {
    ...originalModule,
    getGenericPassword: jest.fn().mockReturnValue(
      Promise.resolve({
        password: 'sP5RjtxB5QGtecG/mkApT31N+ZGi4rx15w1r/cCeJ0k=',
      }),
    ),
  };
});

describe('retrieveEntropy', () => {
  it('retrieves entropy from keychain and decodes it', async () => {
    const decodedEntropy = await retrieveEntropy();
    expect(decodedEntropy).toEqual(
      new Uint8Array([
        176, 254, 81, 142, 220, 65, 229, 1, 173, 121, 193, 191, 154, 64, 41, 79,
        125, 77, 249, 145, 162, 226, 188, 117, 231, 13, 107, 253, 192, 158, 39,
        73,
      ]),
    );
  });
});
