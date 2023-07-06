import { StyleSheet, View } from 'react-native';
import PiggyBank from 'src/shared/assets/piggyBank.svg';
import { QuaiPayText } from 'src/shared/components';
import Card from 'src/shared/assets/card.svg';
import Send from 'src/shared/assets/send.svg';
import Receive from 'src/shared/assets/receive.svg';
import Account from 'src/shared/assets/account.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';

export const Icons = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.landing',
  });
  const styles = useThemedStyle(themedStyle);

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <PiggyBank />
        </View>
        <QuaiPayText>{t('invest')}</QuaiPayText>
      </View>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <Card />
        </View>
        <QuaiPayText>{t('payment')}</QuaiPayText>
      </View>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <Send />
        </View>
        <QuaiPayText>{t('send')}</QuaiPayText>
      </View>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <Receive />
        </View>
        <QuaiPayText>{t('receive')}</QuaiPayText>
      </View>
      <View style={styles.iconText}>
        <View style={styles.icon}>
          <Account />
        </View>
        <QuaiPayText>{t('account')}</QuaiPayText>
      </View>
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.border,
      borderWidth: 1,
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    iconText: {
      justifyContent: 'center',
    },
    wrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      marginBottom: 20,
    },
  });
