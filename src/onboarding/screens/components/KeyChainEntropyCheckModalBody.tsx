import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { QuaiPayButton, QuaiPayText } from 'src/shared/components';

export const KeyChainEntropyCheckModalBody: React.FC = ({}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.login.landing.keychainBottomSheet',
  });

  return (
    <View style={styles.mainContainer}>
      <QuaiPayText>{t('title')}</QuaiPayText>
      <QuaiPayText>{t('description')}</QuaiPayText>
      <QuaiPayButton outlined type={'secondary'} title={t('dismissButton')} />
      <QuaiPayButton title={t('continueButton')} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 32,
    marginHorizontal: 16,
  },
});
