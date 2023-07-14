import buffer from 'buffer';
import { generateSecureRandom } from 'react-native-securerandom';
import { quais } from 'quais';

import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import { Wallet, Zone } from 'src/shared/types';
import { getZoneIndex } from 'src/shared/utils/getZoneIndex';
import { OnboardingInfo } from 'src/shared/context/walletContext';
import { isUniq } from 'src/shared/utils/isUniq';

// eslint-disable-next-line quotes
const accountHDPath = `m/44'/994'/0'/0`;

export async function setUpWallet(
  entropy?: Uint8Array,
  zone = Zone['zone-0-0'],
): Promise<OnboardingInfo> {
  if (!entropy) {
    entropy = await generateSecureRandom(32);
    while (!isUniq(entropy)) {
      entropy = await generateSecureRandom(32);
    }
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

  const walletObject = childNodes.reduce((acc, node, ind: number) => {
    const zoneIndex = getZoneIndex(ind);
    return {
      ...acc,
      [zoneIndex]: node,
    };
  }, {} as Record<Zone, Wallet>);

  await storeItem(
    { key: keychainKeys.wallet, value: JSON.stringify(walletObject) },
    true,
  );
  await storeItem({ key: keychainKeys.contacts, value: '[]' });

  return {
    entropy: encodedEntropy,
    wallet: walletObject[zone],
    walletObject,
  };
}
