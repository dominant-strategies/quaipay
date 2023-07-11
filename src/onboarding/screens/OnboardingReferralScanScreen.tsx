import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  QuaiPayContent,
  QuaiPayLoader,
  QuaiPayText,
  squareHoleSize,
} from 'src/shared/components';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const OnboardingReferralScanScreen: React.FC<
  OnboardingStackScreenProps<'OnboardingReferralScan'>
> = ({}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.referralScan',
  });
  const [redirecting, _] = useState(false);

  return redirecting ? (
    <QuaiPayLoader text={t('redirecting')} />
  ) : (
    <QuaiPayContent hasBackgroundVariant>
      <QuaiPayText type="H1" style={styles.title}>
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
  title: {
    alignItems: 'center',
    marginHorizontal: 48,
    marginVertical: 20,
  },
  description: {
    top: 60 + squareHoleSize,
    marginTop: 48,
    marginHorizontal: 48,
  },
});
