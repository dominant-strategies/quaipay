import React from 'react';

import { MainTabStackScreenProps } from '../MainStack';
import {
  CardSize,
  QuaiPayCard,
  QuaiPayContent,
  QuaiPaySearchbar,
  QuaiPayText,
} from 'src/shared/components';
import { Pressable, StyleSheet, View } from 'react-native';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import FilterIcon from 'src/shared/assets/filter.svg';
import { useTranslation } from 'react-i18next';
import { styledColors, typography } from 'src/shared/styles';

const WalletScreen: React.FC<MainTabStackScreenProps<'Wallet'>> = ({}) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);

  return (
    <QuaiPayContent navButton={false}>
      <View style={styles.cardWrapper}>
        <QuaiPayCard
          size={CardSize.Small}
          quaiAmount="142.123"
          address="0x123453.....0934823"
          zone="Cyprus-02"
          fiatAmount="1,000"
          title={t('wallet.balance')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.addressButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText style={[typography.H3, styles.colorOverwrite]}>
            {t('wallet.chooseAddress')}
          </QuaiPayText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.earnButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText style={[typography.H3]}>{t('wallet.earn')}</QuaiPayText>
        </Pressable>
      </View>
      <View style={styles.transactionsWrapper}>
        <View style={styles.transactionsHeader}>
          <QuaiPayText style={[typography.H3, { color: styledColors.gray }]}>
            {t('wallet.transactionsHistory')}
          </QuaiPayText>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.filterButton,
              pressed && { opacity: 0.5 },
            ]}
          >
            <QuaiPayText
              style={[typography.default, { color: styledColors.gray }]}
            >
              {t('wallet.filter')}&nbsp;
            </QuaiPayText>
            <FilterIcon />
          </Pressable>
        </View>
        <QuaiPaySearchbar placeholder={t('wallet.searchByTransaction')} />
      </View>
    </QuaiPayContent>
  );
};
const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    addressButton: {
      backgroundColor: theme.normal,
      width: 210,
    },
    button: {
      height: 32,
      justifyContent: 'center',
      borderRadius: 8,
    },
    buttonWrapper: {
      backgroundColor: theme.surface,
      borderRightWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: theme.border,
      height: 60,
    },
    cardWrapper: {
      marginBottom: 20,
    },
    colorOverwrite: {
      color: styledColors.white,
    },
    earnButton: {
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderColor: styledColors.gray,
      width: 110,
    },
    filterButton: {
      backgroundColor: theme.surface,
      color: styledColors.gray,
      borderWidth: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.border,
      borderRadius: 4,
      height: 25,
      width: 77,
    },
    transactionsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    transactionsWrapper: {
      backgroundColor: theme.surface,
      padding: 16,
    },
  });

export default WalletScreen;
