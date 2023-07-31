import React, { useCallback, useEffect, useRef, useState } from 'react';

import { MainTabStackScreenProps } from '../MainStack';
import {
  CardSize,
  QuaiPayCard,
  QuaiPayContent,
  QuaiPayListItem,
  QuaiPayLoader,
  QuaiPaySearchbar,
  QuaiPayText,
} from 'src/shared/components';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Theme, Zone } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import FilterIcon from 'src/shared/assets/filter.svg';
import UserIcon from 'src/shared/assets/accountDetails.svg';
import UserIconWhite from 'src/shared/assets/accountDetailsWhite.svg';
import { useTranslation } from 'react-i18next';
import { styledColors } from 'src/shared/styles';
import { Transaction } from 'src/shared/services/blockscout';
import { dateToLocaleString, Timeframe } from 'src/shared/services/dateUtil';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FilterModal } from 'src/main/wallet/FilterModal';
import { QuaiPayActiveAddressModal } from 'src/shared/components/QuaiPayActiveAddressModal';
import { abbreviateAddress } from 'src/shared/services/quais';
import { useZone } from 'src/shared/hooks/useZone';
import { useContacts, useWallet, useWalletObject } from 'src/shared/hooks';
import { allNodeData } from 'src/shared/constants/nodeData';
import { useTheme } from 'src/shared/context/themeContext';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { RootNavigator } from 'src/shared/navigation/utils';
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';
import { updateBalances } from 'src/main/wallet/utils/updateBalances';
import { log } from 'src/shared/services/logging';

import { updateTransaction } from './utils/updateTransaction';

export type Balances = Partial<Record<Zone, string>>;

const WalletScreen: React.FC<MainTabStackScreenProps<'Wallet'>> = () => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const { isDarkMode } = useTheme();
  const wallet = useWallet();
  const walletObject = useWalletObject();
  const { zone } = useZone();
  const contacts = useContacts();
  const quaiRate = useQuaiRate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTxDirection, setSelectedTxDirection] = useState<string>();
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>();
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(1e18);
  const [shards, setShards] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<Balances>();
  const filterModalRef = useRef<BottomSheetModal>(null);
  const activeAddressModalRef = useRef<BottomSheetModal>(null);
  const { showSnackBar } = useSnackBar();
  // TODO: Handle the pagination
  const [filters, _] = useState({ page: 1, offset: 30 });

  const handlePresentFilterModalPress = useCallback(() => {
    filterModalRef.current?.present();
  }, []);

  const handlePresentActiveAddressModalPress = useCallback(() => {
    activeAddressModalRef.current?.present();
  }, []);

  const handleBalanceUpdate = (b: typeof balances) =>
    setBalances(prevState => ({ ...prevState, ...b }));

  useEffect(() => {
    if (!walletObject) {
      return;
    }
    updateBalances(walletObject, zone, handleBalanceUpdate)
      .catch(err => {
        log.error(err);
        showSnackBar({
          message: t('common.error'),
          moreInfo: t('wallet.getBalanceError') || '',
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [walletObject, zone]);

  useEffect(() => {
    if (!quaiRate || !wallet) {
      return;
    }

    setLoading(true);
    const promises = shards.map(async shardNumber =>
      updateTransaction({
        shardNumber,
        walletObject,
        filters,
        selectedTimeframe,
        selectedTxDirection,
        amountBounds: {
          min: minAmount,
          max: maxAmount,
        },
        zone,
        quaiRate,
        contacts,
      }).catch(err => {
        log.error(err);
        throw err;
      }),
    );

    Promise.allSettled(promises)
      .then(txs => {
        txs.forEach(tx => {
          if (tx.status === 'fulfilled') {
            setTransactions(prevState => [
              ...prevState,
              ...(tx.value ? tx.value : []),
            ]);
          }
        });
      })
      .catch(err => {
        log.error(
          `Error while updating transactions. Showing snack bar with error\n${err}`,
        );
        showSnackBar({
          message: 'Error while trying to update transactions',
          moreInfo: 'Try again later',
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [
    zone,
    shards,
    selectedTxDirection,
    selectedTimeframe,
    minAmount,
    maxAmount,
    quaiRate,
    wallet,
  ]);

  const navigateToReferral = useCallback(() => {
    RootNavigator.navigate('SettingsStack', { screen: 'Referral' });
  }, []);

  // TODO: implement actual search logic
  const onSearchChange = (text: string) => console.log(text);

  if (loading || !wallet || !walletObject || !quaiRate) {
    return <QuaiPayLoader text={t('wallet.loading')} />;
  }

  return (
    <QuaiPayContent noNavButton>
      <FilterModal
        setSelectedTimeframe={timeframe =>
          setSelectedTimeframe(timeframe as Timeframe)
        }
        setSelectedTxDirection={setSelectedTxDirection}
        setMinAmount={setMinAmount}
        setMaxAmount={setMaxAmount}
        setShards={setShards}
        ref={filterModalRef}
        walletObject={walletObject}
      />
      <QuaiPayActiveAddressModal
        balances={balances}
        ref={activeAddressModalRef}
      />
      <View style={styles.cardWrapper}>
        <QuaiPayCard
          size={CardSize.Small}
          quaiAmount={balances?.[zone] ?? ''}
          address={abbreviateAddress(wallet?.address as string)}
          zone={allNodeData[zone].name}
          fiatAmount={(Number(balances?.[zone]) * quaiRate.base).toFixed(3)}
          title={t('wallet.balance')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Pressable
          onPress={handlePresentActiveAddressModalPress}
          style={({ pressed }) => [
            styles.button,
            styles.addressButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="paragraph" style={styles.colorOverwrite}>
            {t('wallet.chooseAddress')}
          </QuaiPayText>
        </Pressable>
        <Pressable
          onPress={navigateToReferral}
          style={({ pressed }) => [
            styles.button,
            styles.earnButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="H3">{t('wallet.earn')}</QuaiPayText>
        </Pressable>
      </View>
      <View style={styles.transactionsWrapper}>
        <View style={styles.transactionsHeader}>
          <QuaiPayText style={{ color: styledColors.gray }} type="H3">
            {t('wallet.transactionsHistory')}
          </QuaiPayText>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.filterButton,
              pressed && { opacity: 0.5 },
            ]}
            onPress={handlePresentFilterModalPress}
          >
            <QuaiPayText style={{ color: styledColors.gray }}>
              {t('wallet.filter')}&nbsp;
            </QuaiPayText>
            <FilterIcon />
          </Pressable>
        </View>
        <View style={styles.searchbarWrapper}>
          <QuaiPaySearchbar
            onSearchChange={onSearchChange}
            placeholder={t('wallet.searchByTransaction')}
          />
        </View>
        {transactions.length === 0 ? (
          <QuaiPayText type="paragraph">
            {t('wallet.noTransaction')}
          </QuaiPayText>
        ) : (
          <FlatList
            data={transactions}
            contentContainerStyle={styles.flatlistContainer}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => (
              <QuaiPayListItem
                date={dateToLocaleString(
                  new Date(Number(item.timeStamp) * 1000),
                )}
                fiatAmount={item.fiatAmount.toFixed(3)}
                name={item.recipient.display}
                picture={
                  item.recipient.profilePicture ? (
                    item.recipient.profilePicture
                  ) : isDarkMode ? (
                    <UserIconWhite />
                  ) : (
                    <UserIcon />
                  )
                }
                quaiAmount={parseFloat(item.quaiAmount.toFixed(6)).toString()}
              />
            )}
            keyExtractor={tx => tx.hash}
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
      marginVertical: 20,
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
    flatlistContainer: {
      // TODO: use flex
      paddingBottom: 280,
    },
    searchbarWrapper: {
      marginBottom: 22,
      marginTop: 10,
    },
    backgroundSurface: {
      backgroundColor: theme.background,
    },
  });

export default WalletScreen;
