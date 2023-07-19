import { quais } from 'quais';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Frame } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { Linking } from 'react-native';

import { setUpWallet } from 'src/onboarding/services/setUpWallet';
import { OnboardingStackNavigationProp } from 'src/onboarding/OnboardingStack';
import { useWalletContext } from 'src/shared/context/walletContext';
import { useUsername, useWallet } from 'src/shared/hooks';
import { RootNavigator } from 'src/shared/navigation/utils';
import {
  getSeedPhraseFromEntropy,
  validatePhrase,
} from 'src/shared/utils/seedPhrase';

import { ScannerType } from './QuaiPayCamera.types';
import { Zone } from 'src/shared/types';
import makeBlockie from 'ethereum-blockies-base64';

interface HookOutput {
  frameProcessor: (frame: Frame) => void;
}

const useSendAmountScannerCamera = () => {
  const wallet = useWallet();
  const sender = useUsername();
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  // Alternatively you can use the underlying function:
  //
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  useEffect(() => {
    if (!wallet) {
      return;
    }
    if (barcodes.length > 0 && barcodes[0].content.data) {
      const { address, amount, username, profilePicture } = JSON.parse(
        barcodes[0].content.data as string,
      );
      if (quais.utils.isAddress(address)) {
        RootNavigator.navigate('SendStack', {
          screen: 'SendAmount',
          params: {
            amount: amount || 0,
            receiverAddress: address,
            // TODO: replace address to generate blockie with walletObject[zone] when setup
            receiverPFP: Zone?.[profilePicture as keyof typeof Zone]
              ? makeBlockie(address)
              : profilePicture,
            receiverUsername: username,
            sender: sender!,
          },
        });
      }
    }
  }, [barcodes, wallet]);

  return {
    frameProcessor,
  };
};

const useLoginCodeScannerCamera = (toggleLoader?: () => void) => {
  const navigation =
    useNavigation<OnboardingStackNavigationProp<'LoginQRCodeScan'>>();
  const { initFromOnboarding } = useWalletContext();
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    if (barcodes.length > 0 && barcodes[0].content.data) {
      const scannedEntropy = barcodes[0].content.data as string;
      if (validatePhrase(getSeedPhraseFromEntropy(scannedEntropy))) {
        toggleLoader && toggleLoader();
        setUpWallet()
          .then(info => initFromOnboarding(info))
          .finally(() => {
            navigation.navigate('SetupNameAndPFP');
            toggleLoader && toggleLoader();
          });
      }
    }
  }, [barcodes]);

  return {
    frameProcessor,
  };
};

const useReferralCodeScannerCamera = (toggleRedirecting?: () => void) => {
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  useEffect(() => {
    if (barcodes.length > 0 && barcodes[0].content.data) {
      const { link } = JSON.parse(barcodes[0].content.data as string);
      if (link) {
        toggleRedirecting && toggleRedirecting();
        Linking.openURL(link);
        toggleRedirecting && toggleRedirecting();
      }
    }
  }, [barcodes]);

  return {
    frameProcessor,
  };
};

const hookByType: Record<ScannerType, (action?: () => void) => HookOutput> = {
  [ScannerType.SEND_AMOUNT]: useSendAmountScannerCamera,
  [ScannerType.LOGIN_CODE]: (action?: () => void) =>
    useLoginCodeScannerCamera(action),
  [ScannerType.REFERRAL_CODE]: (action?: () => void) =>
    useReferralCodeScannerCamera(action),
};

export const useQuaiPayCamera = (type: ScannerType, action?: () => void) =>
  hookByType[type](action);
