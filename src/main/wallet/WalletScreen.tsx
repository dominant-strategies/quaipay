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

const WalletScreen: React.FC<MainTabStackScreenProps<'Wallet'>> = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'wallet' });
  const styles = useThemedStyle(themedStyle);
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
  const [minAmount, setMinAmount] = useState(0);
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

  // TODO: show loader while fetching transactions and balance
  useEffect(() => {
    setLoading(true);
    getAccountTransactions(
      {
        address: wallet?.address as string,
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
    )
      .then(res => {
        setTransactions(
          res.result.map(item => {
            const isUserSender =
              item.from.toLowerCase() === wallet?.address.toLowerCase();
            let contact = contacts?.find(
              c => c.address === (isUserSender ? item.to : item.from),
            )?.username;
            if (!contact) {
              contact = isUserSender
                ? abbreviateAddress(item.to)
                : abbreviateAddress(item.from);
            }
            return {
              ...item,
              contact: contact as string,
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

    getBalance(wallet?.address as string, zone)
      .then(res => {
        setBalance(Number(quais.utils.formatEther(res)).toFixed(3));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedTxDirection]);

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
      <QuaiPayActiveAddressModal ref={activeAddressModalRef} />
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
            renderItem={({ item }) => (
              <QuaiPayListItem
                date={dateToLocaleString(
                  new Date(Number(item.timeStamp) * 1000),
                )}
                fiatAmount={item.fiatAmount.toFixed(3)}
                name={item.contact}
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
    searchbarWrapper: {
      marginBottom: 22,
      marginTop: 10,
    },
    backgroundSurface: {
      backgroundColor: theme.background,
    },
  });

export default WalletScreen;
