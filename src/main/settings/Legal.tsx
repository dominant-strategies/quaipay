import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { QuaiPaySettingsContent, QuaiPayText } from 'src/shared/components';
import { useTranslation } from 'react-i18next';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';

export const Legal = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.legal',
  });
  const styles = useThemedStyle(themedStyle);

  return (
    <QuaiPaySettingsContent title={t('legal')}>
      <ScrollView contentContainerStyle={styles.container}>
        <QuaiPayText type="H3">{t('title')}</QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('description')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('firstPoint')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('firstPointDescription')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('secondPoint')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('secondPointDescription')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('thirdPoint')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('thirdPointDescription')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('fourthPoint')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('fourthPointDescription')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('fifthPoint')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('fifthPointDescription')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('sixthPoint')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('sixthPointDescription')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('seventhPoint')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('seventhPointDescription')}
        </QuaiPayText>
      </ScrollView>
    </QuaiPaySettingsContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      padding: 16,
    },
    descriptionText: {
      textAlign: 'left',
      marginBottom: 16,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.normal,
      borderRadius: 4,
      borderWidth: 1,
    },
  });
