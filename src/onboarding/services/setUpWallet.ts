import buffer from 'buffer';
import { generateSecureRandom } from 'react-native-securerandom';
import { quais } from 'quais';

import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import { getZone } from 'src/shared/services/retrieveWallet';
import { Wallet } from 'src/shared/types';

type ZoneIndex = Exclude<
  keyof typeof keychainKeys,
  'username' | 'profilePicture' | 'location' | 'entropy'
>;

// eslint-disable-next-line quotes
const accountHDPath = `m/44'/994'/0'/0`;

export async function setUpWallet(entropy?: Uint8Array) {
  if (!entropy) {
    entropy = await generateSecureRandom(32);
  }
  const encodedEntropy = buffer.Buffer.from(entropy).toString('hex');
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

  const parsedNodes = childNodes.map((node, ind: number) => {
    const zoneIndex = `wallet-zone-${Math.floor(ind / 3)}-${ind % 3}`;
    return {
      node,
      key: keychainKeys[zoneIndex as ZoneIndex],
    };
  });

  await Promise.all(
    parsedNodes.map(({ key, node }) => {
      return storeItem(
        {
          key,
          value: JSON.stringify(node),
        },
        true,
      );
    }),
  );

  return {
    entropy: encodedEntropy,
    wallet: parsedNodes.find(n => n.key === getZone())?.node as unknown as
      | Wallet
      | undefined,
  };
}
