import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  QuaiPayCamera,
  QuaiPayContent,
  QuaiPayText,
  ScannerType,
  useQuaiPayCamera,
  squareHoleSize,
} from 'src/shared/components';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const LoginQRCodeScanScreen: React.FC<
  OnboardingStackScreenProps<'LoginQRCodeScan'>
> = ({}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.login.qrCodeScan',
  });
  const { frameProcessor } = useQuaiPayCamera(ScannerType.LOGIN_CODE)();

  return (
    <QuaiPayContent hasBackgroundVariant>
      <QuaiPayCamera frameProcessor={frameProcessor} />
      <QuaiPayText type="H1" style={[styles.textContainer, styles.title]}>
        {t('title')}
      </QuaiPayText>
      <QuaiPayText
        type="paragraph"
        themeColor="secondary"
        style={styles.description}
      >
        {t('description')}
      </QuaiPayText>
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    marginHorizontal: 48,
  },
  title: {
    marginVertical: 20,
  },
  description: {
    top: 60 + squareHoleSize,
    marginTop: 48,
    marginHorizontal: 48,
  },
});
