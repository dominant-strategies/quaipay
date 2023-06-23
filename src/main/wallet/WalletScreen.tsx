import React, { useEffect } from 'react';

import { MainTabStackScreenProps } from '../MainStack';
import {
  CardSize,
  QuaiPayCard,
  QuaiPayContent,
  QuaiPayListItem,
  QuaiPaySearchbar,
  QuaiPayText,
} from 'src/shared/components';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import FilterIcon from 'src/shared/assets/filter.svg';
import { useTranslation } from 'react-i18next';
import { styledColors } from 'src/shared/styles';
import { getAccountTransactions } from 'src/shared/services/blockscout';
import { useWallet } from 'src/shared/hooks';

const WalletScreen: React.FC<MainTabStackScreenProps<'Wallet'>> = ({}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'wallet' });
  const styles = useThemedStyle(themedStyle);
  const wallet = useWallet();

  useEffect(() => {
    getAccountTransactions(
      wallet?.address as string,
      'desc',
      1,
      20,
      1686782724,
      Date.now(),
      'to',
      50000000000000000,
      1000000000000000000,
    )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <QuaiPayContent noNavButton>
      <View style={styles.cardWrapper}>
        <QuaiPayCard
          size={CardSize.Small}
          quaiAmount="142.123"
          address="0x123453.....0934823"
          zone="Cyprus-02"
          fiatAmount="1,000"
          title={t('balance')}
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
          <QuaiPayText type="paragraph" style={styles.colorOverwrite}>
            {t('chooseAddress')}
          </QuaiPayText>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.earnButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="H3">{t('earn')}</QuaiPayText>
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.transactionsWrapper}>
          <View style={styles.transactionsHeader}>
            <QuaiPayText style={{ color: styledColors.gray }} type="H3">
              {t('transactionsHistory')}
            </QuaiPayText>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.filterButton,
                pressed && { opacity: 0.5 },
              ]}
            >
              <QuaiPayText style={{ color: styledColors.gray }}>
                {t('filter')}&nbsp;
              </QuaiPayText>
              <FilterIcon />
            </Pressable>
          </View>
          <View style={styles.searchbarWrapper}>
            <QuaiPaySearchbar placeholder={t('searchByTransaction')} />
          </View>
          <QuaiPayListItem
            date="April 26, 2023  17:23:04"
            fiatAmount="0.99"
            name="John Doe"
            picture="https://picsum.photos/666"
            quaiAmount="+ XXX.XXXXX"
          />
          <QuaiPayListItem
            date="April 26, 2023  17:23:04"
            fiatAmount="0.99"
            name="John Doe"
            picture="https://picsum.photos/666"
            quaiAmount="+ XXX.XXXXX"
          />
          <QuaiPayListItem
            date="April 26, 2023  17:23:04"
            fiatAmount="0.99"
            name="John Doe"
            picture="https://picsum.photos/666"
            quaiAmount="+ XXX.XXXXX"
          />
          <QuaiPayListItem
            date="April 26, 2023  17:23:04"
            fiatAmount="0.99"
            name="John Doe"
            picture="https://picsum.photos/666"
            quaiAmount="+ XXX.XXXXX"
          />
          <QuaiPayListItem
            date="April 26, 2023  17:23:04"
            fiatAmount="0.99"
            name="John Doe"
            picture="https://picsum.photos/666"
            quaiAmount="+ XXX.XXXXX"
          />
          <QuaiPayListItem
            date="April 26, 2023  17:23:04"
            fiatAmount="0.99"
            name="John Doe"
            picture="https://picsum.photos/666"
            quaiAmount="+ XXX.XXXXX"
          />
          <QuaiPayListItem
            date="April 26, 2023  17:23:04"
            fiatAmount="0.99"
            name="John Doe"
            picture="https://picsum.photos/666"
            quaiAmount="+ XXX.XXXXX"
          />
          <QuaiPayListItem
            date="April 26, 2023  17:23:04"
            fiatAmount="0.99"
            name="John Doe"
            picture="https://picsum.photos/666"
            quaiAmount="+ XXX.XXXXX"
          />
        </View>
      </ScrollView>
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
    },
    transactionsWrapper: {
      backgroundColor: theme.surface,
      padding: 16,
    },
    searchbarWrapper: {
      marginBottom: 22,
      marginTop: 10,
    },
  });

export default WalletScreen;
