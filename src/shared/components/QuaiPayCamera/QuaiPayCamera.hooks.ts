import { quais } from 'quais';
import { useEffect } from 'react';
import { useUsername, useWallet } from 'src/shared/hooks';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { ScannerType } from './QuaiPayCamera.types';
import { RootNavigator } from 'src/shared/navigation/utils';
import { Frame } from 'react-native-vision-camera';

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
      const { address, amount, username } = JSON.parse(
        barcodes[0].content.data as string,
      );
      if (quais.utils.isAddress(address)) {
        RootNavigator.navigate('SendStack', {
          screen: 'SendAmount',
          params: {
            address,
            amount: amount || 0,
            receiver: username,
            wallet,
            sender,
          },
        });
      }
    }
  }, [barcodes, wallet]);

  return {
    frameProcessor,
  };
};

const hookByType: Record<ScannerType, () => HookOutput> = {
  [ScannerType.SEND_AMOUNT]: useSendAmountScannerCamera,
};

export const useQuaiPayCamera = (type: ScannerType) => hookByType[type];
