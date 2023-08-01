import React from 'react';

import {
  useQuaiPayCamera,
  QuaiPayCamera,
  QuaiPayContent,
  ScannerType,
} from 'src/shared/components';

import { QuaiPayContactBottomSheet } from './QuaiPayContactBottomSheet/QuaiPayContactBottomSheet';

const SendScanScreen: React.FC = () => {
  const { frameProcessor } = useQuaiPayCamera(ScannerType.SEND_AMOUNT);

  return (
    <QuaiPayContent noNavButton hasBackgroundVariant>
      <QuaiPayCamera frameProcessor={frameProcessor} />
      <QuaiPayContactBottomSheet />
    </QuaiPayContent>
  );
};

export default SendScanScreen;
