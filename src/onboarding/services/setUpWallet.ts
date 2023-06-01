import { generateSecureRandom } from 'react-native-securerandom';
import buffer from 'buffer';
import { storeItem } from 'src/shared/services/keychain';
import { KeychainKeys } from 'src/shared/constants';
import { quais } from 'quais';

// eslint-disable-next-line quotes
const accountHDPath = `m/44'/994'/0'/0`;

export async function setUpWallet() {
  const entropy = await generateSecureRandom(32);
  const encodedEntropy = buffer.Buffer.from(entropy).toString('base64');
  await storeItem(
    {
      key: KeychainKeys.entropy,
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
        keyof typeof KeychainKeys,
        'username' | 'profilePicture' | 'location' | 'entropy'
      >;
      const zoneIndex = `wallet-zone-${Math.floor(ind / 3)}-${ind % 3}`;
      return storeItem(
        {
          key: KeychainKeys[zoneIndex as ZoneIndex],
          value: JSON.stringify(node),
        },
        true,
      );
    }),
  );
}
