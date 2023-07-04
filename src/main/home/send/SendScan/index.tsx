import React from 'react';

import {
  useQuaiPayCamera,
  QuaiPayCamera,
  QuaiPayContactBottomSheet,
  QuaiPayContent,
  ScannerType,
} from 'src/shared/components';

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
