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
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('description')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('firstPoint')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('firstPointDescription')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('secondPoint')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('secondPointDescription')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('thirdPoint')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('thirdPointDescription')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('fourthPoint')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('fourthPointDescription')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('fifthPoint')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('fifthPointDescription')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('sixthPoint')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('sixthPointDescription')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('seventhPoint')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
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
    secondary: {
      color: theme.secondary,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.normal,
      borderRadius: 4,
      borderWidth: 1,
    },
  });
