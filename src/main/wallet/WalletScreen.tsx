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
import {
  Transaction,
  getAccountTransactions,
  getBalance,
  Recipient,
} from 'src/shared/services/blockscout';
import { quais } from 'quais';
import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';
import { dateToLocaleString } from 'src/shared/services/dateUtil';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { FilterModal } from 'src/main/wallet/FilterModal';
import { QuaiPayActiveAddressModal } from 'src/shared/components/QuaiPayActiveAddressModal';
import { abbreviateAddress } from 'src/shared/services/quais';
import { useZone } from 'src/shared/hooks/useZone';
import { useContacts, useWallet, useWalletObject } from 'src/shared/hooks';
import { allNodeData } from 'src/shared/constants/nodeData';
import { useTheme } from 'src/shared/context/themeContext';

const WalletScreen: React.FC<MainTabStackScreenProps<'Wallet'>> = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'wallet' });
  const styles = useThemedStyle(themedStyle);
  const { isDarkMode } = useTheme();
  const wallet = useWallet();
  const walletObject = useWalletObject();
  const zone = useZone();
  const contacts = useContacts();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTxDirection, setSelectedTxDirection] = useState<
    string | undefined
  >();
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    string | undefined
  >();
  const [minAmount, setMinAmount] = useState(1);
  const [maxAmount, setMaxAmount] = useState(1000000000000000000000000);
  const [shards, setShards] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  // TODO: remove console.log when we use these values
  console.log(shards, selectedTimeframe);

  const filterModalRef = useRef<BottomSheetModal>(null);
  const activeAddressModalRef = useRef<BottomSheetModal>(null);

  const handlePresentFilterModalPress = useCallback(() => {
    filterModalRef.current?.present();
  }, []);

  const handlePresentActiveAddressModalPress = useCallback(() => {
    activeAddressModalRef.current?.present();
  }, []);
  const [balance, setBalance] = useState('0');
  const [balances, setBalances] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateBalances = async () => {
      const balancePromises = Object.keys(walletObject as object).map(
        async key => {
          const address =
            (walletObject && walletObject[key as Zone].address) || '';
          try {
            const res = await getBalance(address, zone);
            const formattedBalance = Number(
              quais.utils.formatEther(res),
            ).toFixed(3);
            return { address: address, balance: formattedBalance };
          } catch (error) {
            return { address: address, balance: 'Error' };
          }
        },
      );

      Promise.allSettled(balancePromises)
        .then(results => {
          const updatedBalances: any = {};
          results.forEach(result => {
            if (result.status === 'fulfilled') {
              const { address } = result.value;
              updatedBalances[address] = result.value.balance;
            }
          });
          setBalances(prevBalances => ({
            ...prevBalances,
            ...updatedBalances,
          }));
        })
        .finally(() => setLoading(false));
    };

    const updateWalletBalance = async () => {
      if (wallet?.address) {
        try {
          const res = await getBalance(wallet.address, zone);
          const formattedBalance = Number(quais.utils.formatEther(res)).toFixed(
            3,
          );
          setBalance(formattedBalance);
        } catch (error) {
          setBalance('Error');
        }
      }
    };

    updateBalances();
    updateWalletBalance();
  }, [wallet, zone]);

  useEffect(() => {
    setLoading(true);
    const txAllShards: Transaction[] = [];
    const promises = shards.map(async shard => {
      const zoneShard = Object.keys(walletObject as object)[shard];
      const address =
        walletObject?.[zoneShard as keyof typeof walletObject]?.address;
      try {
        const res = await getAccountTransactions(
          {
            address: address || '',
            sort: 'desc',
            page: 1,
            offset: 100,
            startTimestamp: 0,
            endTimestamp: Date.now(),
            filterBy: selectedTxDirection,
            minAmount,
            maxAmount,
          },
          zone,
        );
        const filteredTransactions = res.result.filter(item => {
          if (minAmount && minAmount > 0) {
            return item.quaiAmount >= minAmount;
          }
          if (maxAmount && maxAmount > 0) {
            return item.quaiAmount <= maxAmount;
          }
          if (selectedTxDirection) {
            if (selectedTxDirection === 'from') {
              return item.from.toLowerCase() === wallet?.address?.toLowerCase();
            }
            if (selectedTxDirection === 'to') {
              return item.to.toLowerCase() === wallet?.address?.toLowerCase();
            }
          }
          if (selectedTimeframe) {
            const currentTime = Date.now();
            const oneYearAgo = new Date(currentTime);
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            const sixMonthsAgo = new Date(currentTime);
            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
            const ninetyDaysAgo = new Date(currentTime);
            ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
            const thirtyDaysAgo = new Date(currentTime);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            const sevenDaysAgo = new Date(currentTime);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

            if (selectedTimeframe === 'Past year') {
              return Number(item.timeStamp) >= oneYearAgo.getTime() / 1000;
            } else if (selectedTimeframe === 'Past 6 months') {
              return Number(item.timeStamp) >= sixMonthsAgo.getTime() / 1000;
            } else if (selectedTimeframe === 'Past 90 days') {
              return Number(item.timeStamp) >= ninetyDaysAgo.getTime() / 1000;
            } else if (selectedTimeframe === 'Past 30 days') {
              return Number(item.timeStamp) >= thirtyDaysAgo.getTime() / 1000;
            } else if (selectedTimeframe === 'This week') {
              return Number(item.timeStamp) >= sevenDaysAgo.getTime() / 1000;
            }
          }
          return true;
        });
        const mappedTransactions = filteredTransactions.map(item => {
          const isUserSender =
            item.from.toLowerCase() === wallet?.address.toLowerCase();
          const contact = contacts?.find(
            c =>
              c.address.toLowerCase() ===
              (isUserSender ? item.to.toLowerCase() : item.from.toLowerCase()),
          );
          const recipient: Recipient = contact
            ? {
                display: contact.username,
                profilePicture: contact.profilePicture,
              }
            : {
                display: isUserSender
                  ? abbreviateAddress(item.to)
                  : abbreviateAddress(item.from),
              };

          return {
            ...item,
            recipient,
          };
        });
        txAllShards.push(...mappedTransactions);
      } catch (err) {
        console.log(err);
      }
    });
    Promise.allSettled(promises)
      .then(() => {
        setLoading(false);
        setTransactions(txAllShards);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [
    zone,
    shards,
    selectedTxDirection,
    selectedTimeframe,
    minAmount,
    maxAmount,
  ]);

  // TODO: implement actual search logic
  const onSearchChange = (text: string) => console.log(text);

  if (loading || !wallet || !walletObject) {
    return <QuaiPayLoader text={t('loading')} />;
  }

  return (
    <QuaiPayContent noNavButton>
      <FilterModal
        setSelectedTimeframe={setSelectedTimeframe}
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
          quaiAmount={balance.toString()}
          address={abbreviateAddress(wallet?.address as string)}
          zone={allNodeData[zone].name}
          fiatAmount={(Number(balance) * EXCHANGE_RATE).toFixed(3)}
          title={t('balance')}
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
            onPress={handlePresentFilterModalPress}
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
            contentContainerStyle={styles.flatlistContainer}
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
