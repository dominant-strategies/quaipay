import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  QuaiPayButton,
  QuaiPaySettingsContent,
  QuaiPayText,
} from 'src/shared/components';
import { useTranslation } from 'react-i18next';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';
import Upload from 'src/shared/assets/upload.svg';

export const Referral = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.referral',
  });
  const styles = useThemedStyle(themedStyle);

  return (
    <QuaiPaySettingsContent
      title={t('referral')}
      containerStyle={styles.container}
    >
      <View>
        <QuaiPayText style={styles.titleText} type="H3">
          {t('title')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('description')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('firstStep')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('firstStepDescription')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('secondStep')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('secondStepDescription')}
        </QuaiPayText>
        <QuaiPayText style={styles.secondary} type="bold">
          {t('thirdStep')}
        </QuaiPayText>
        <QuaiPayText style={[styles.descriptionText, styles.secondary]}>
          {t('thirdStepDescription')}
        </QuaiPayText>
      </View>
      <QuaiPayButton
        containerStyle={styles.button}
        RightIcon={Upload}
        title={t('buttonText')}
        titleColor="normal"
        type="secondary"
      />
    </QuaiPaySettingsContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
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
