import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  QuaiPayButton,
  QuaiPaySettingsContent,
  QuaiPayText,
} from 'src/shared/components';
import { useTranslation } from 'react-i18next';
import Upload from 'src/shared/assets/upload.svg';

export const Referral = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.referral',
  });
  return (
    <QuaiPaySettingsContent
      title={t('referral')}
      containerStyle={styles.container}
    >
      <View>
        <QuaiPayText style={styles.titleText} type="H3">
          {t('title')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('description')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('firstStep')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('firstStepDescription')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('secondStep')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('secondStepDescription')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('thirdStep')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('thirdStepDescription')}
        </QuaiPayText>
      </View>
      <QuaiPayButton RightIcon={Upload} title={t('buttonText')} outlined />
    </QuaiPaySettingsContent>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleText: {
    textAlign: 'left',
  },
  descriptionText: {
    textAlign: 'left',
    marginBottom: 16,
  },
});
