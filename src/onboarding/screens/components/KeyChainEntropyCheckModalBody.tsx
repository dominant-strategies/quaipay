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
      <QuaiPayText type="H2">{t('title')}</QuaiPayText>
      <View style={styles.separator} />
      <QuaiPayText type="paragraph" style={styles.description}>
        {t('description')}
      </QuaiPayText>
      <View style={styles.separator} />
      <View style={styles.buttonsContainer}>
        <QuaiPayButton outlined type={'secondary'} title={t('dismissButton')} />
        <QuaiPayButton title={t('continueButton')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 32,
    marginHorizontal: 16,
  },
  separator: {
    flex: 1,
  },
  description: {
    textAlign: 'left',
    marginHorizontal: 12,
  },
  buttonsContainer: {
    gap: 16,
  },
});
