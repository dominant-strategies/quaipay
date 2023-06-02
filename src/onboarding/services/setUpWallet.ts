import { generateSecureRandom } from 'react-native-securerandom';
import buffer from 'buffer';
import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from '../../shared/constants/keychainKeys';
import { quais } from 'quais';

// eslint-disable-next-line quotes
const accountHDPath = `m/44'/994'/0'/0`;

export async function setUpWallet() {
  const entropy = await generateSecureRandom(32);
  const encodedEntropy = buffer.Buffer.from(entropy).toString('base64');
  await storeItem(
    {
      key: keychainKeys.entropy,
      value: encodedEntropy,
    },
    true,
  );

  const HDNode = quais.utils.HDNode.fromSeed(entropy);
  const childNodes = quais.utils.getAllShardsAddressChildNode(
    HDNode,
    accountHDPath,
  );

  await Promise.all(
    childNodes.map((node, ind: number) => {
      type ZoneIndex = Exclude<
        keyof typeof keychainKeys,
        'username' | 'profilePicture' | 'location' | 'entropy'
      >;
      const zoneIndex = `wallet-zone-${Math.floor(ind / 3)}-${ind % 3}`;
      return storeItem(
        {
          key: keychainKeys[zoneIndex as ZoneIndex],
          value: JSON.stringify(node),
        },
        true,
      );
    }),
  );
}
