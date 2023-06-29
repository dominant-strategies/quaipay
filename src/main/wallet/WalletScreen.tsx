import React, { useEffect, useState } from 'react';

import { MainTabStackScreenProps } from '../MainStack';
import {
  CardSize,
  QuaiPayCard,
  QuaiPayContent,
  QuaiPayListItem,
  QuaiPaySearchbar,
  QuaiPayText,
} from 'src/shared/components';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import FilterIcon from 'src/shared/assets/filter.svg';
import { useTranslation } from 'react-i18next';
import { styledColors } from 'src/shared/styles';
import {
  Transaction,
  getAccountTransactions,
  getBalance,
} from 'src/shared/services/blockscout';
import { useWallet } from 'src/shared/hooks';
import { quais } from 'quais';
import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';
import { dateToLocaleString } from 'src/shared/services/dateUtil';
import { abbreviateAddress } from 'src/shared/services/quais';

const WalletScreen: React.FC<MainTabStackScreenProps<'Wallet'>> = ({}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'wallet' });
  const styles = useThemedStyle(themedStyle);
  const wallet = useWallet();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);

  // TODO: show loader while fetching transactions and balance
  useEffect(() => {
    getAccountTransactions({
      address: wallet?.address as string,
      sort: 'desc',
      page: 1,
      offset: 100,
      start_timestamp: 0,
      end_timestamp: Date.now(),
      filter_by: 'to',
      min_amount: 0,
      max_amount: 1000000000000000000000000,
    })
      .then(res => {
        setTransactions(
          res.result.map(item => {
            return {
              ...item,
              fiatAmount:
                Number(quais.utils.formatEther(item.value)) * EXCHANGE_RATE,
              quaiAmount: Number(quais.utils.formatEther(item.value)),
            };
          }),
        );
      })
      .catch(err => {
        console.log(err);
      });
    getBalance(wallet?.address as string).then(res => {
      setBalance(Number(quais.utils.formatEther(res)));
    });
  }, []);

  // TODO: implement actual search logic
  const onSearchChange = (text: string) => console.log(text);

  return (
    <QuaiPayContent noNavButton>
      <View style={styles.cardWrapper}>
        <QuaiPayCard
          size={CardSize.Small}
          quaiAmount={balance.toString()}
          address={abbreviateAddress(wallet?.address as string)}
          zone="Paxos-01"
          fiatAmount={(balance * EXCHANGE_RATE).toFixed(3)}
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
          <QuaiPaySearchbar
            onSearchChange={onSearchChange}
            placeholder={t('searchByTransaction')}
          />
        </View>
        {transactions.length === 0 ? (
          <QuaiPayText type="paragraph">{t('noTransaction')}</QuaiPayText>
        ) : (
          <FlatList
            data={transactions}
            renderItem={({ item }) => (
              <QuaiPayListItem
                date={dateToLocaleString(
                  new Date(Number(item.timeStamp) * 1000),
                )}
                fiatAmount={item.fiatAmount.toFixed(3)}
                name="John Doe"
                picture="https://picsum.photos/666"
                quaiAmount={item.quaiAmount.toFixed(3)}
              />
            )}
            keyExtractor={item => item.hash}
          />
        )}
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
