import buffer from 'buffer';
import { generateSecureRandom } from 'react-native-securerandom';
import { quais } from 'quais';

import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import { Wallet, Zone } from 'src/shared/types';
import { getZoneIndex } from 'src/shared/utils/getZoneIndex';

// eslint-disable-next-line quotes
const accountHDPath = `m/44'/994'/0'/0`;

export async function setUpWallet(entropy?: Uint8Array, zone?: string) {
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
    const zoneIndex = getZoneIndex(ind);
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
