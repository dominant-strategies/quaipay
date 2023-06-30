import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayQRCode } from 'src/shared/components';
import { fontStyle, styledColors } from 'src/shared/styles';
import { useUsername, useWallet } from 'src/shared/hooks';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { RootNavigator } from 'src/shared/navigation/utils';
import { Currency } from 'src/shared/types';
import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';
import { abbreviateAddress } from 'src/shared/services/quais';

import { ReceiveStackScreenProps } from '../ReceiveStack';
import ShareControl from '../ShareControl';

export const ReceiveQRScreen: React.FC<
  ReceiveStackScreenProps<'ReceiveQR'>
> = ({ route }) => {
  const { amount } = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const username = useUsername();
  const wallet = useWallet();

  const [mainAmount, setMainAmount] = useState(amount);
  const [eqAmount, setEqAmount] = useState(amount / EXCHANGE_RATE);
  const [mainUnit, setMainUnit] = useState(Currency.USD);

  const share = () => console.log('Share triggered');
  const goToQuaiPayInfo = () => console.log('Go to QuaiPay Info');
  const onSwap = () => {
    const pastMain = mainAmount;
    const pastEq = eqAmount;
    setMainAmount(pastEq);
    setEqAmount(pastMain);
    setMainUnit(prevState =>
      prevState === Currency.USD ? Currency.QUAI : Currency.USD,
    );
  };

  const primaryTextColor = isDarkMode ? styledColors.white : styledColors.black;
  const secondaryTextColor = isDarkMode
    ? styledColors.gray
    : styledColors.white;

  const walletCardBackgroundColor = isDarkMode
    ? styledColors.darkGray
    : styledColors.white;

  return (
    <QuaiPayContent title={t('common.request')}>
      <ScrollView>
        <View
          style={[
            styles.walletCard,
            { backgroundColor: walletCardBackgroundColor },
          ]}
        >
          <View style={styles.requestedAmount}>
            <Text style={{ color: secondaryTextColor }}>
              {mainUnit !== Currency.USD && '$'}
              {eqAmount}{' '}
              {mainUnit === Currency.USD ? Currency.QUAI : Currency.USD}
            </Text>
            <Text style={[styles.mainAmount, { color: primaryTextColor }]}>
              {mainUnit === Currency.USD && '$'}
              {mainAmount} {mainUnit}
            </Text>
            <TouchableOpacity onPress={onSwap} style={styles.exchangeUnit}>
              <Text style={{ color: primaryTextColor }}>{Currency.USD}</Text>
              <ExchangeIcon
                color={isDarkMode ? styledColors.white : styledColors.black}
              />
            </TouchableOpacity>
          </View>
          <QuaiPayQRCode
            value={JSON.stringify({
              address: wallet?.address,
              username,
              amount,
            })}
          />
          <View style={styles.userInfo}>
            <Text style={[styles.username, { color: primaryTextColor }]}>
              {username}
            </Text>
            <Text
              style={[fontStyle.fontParagraph, { color: secondaryTextColor }]}
            >
              {wallet && abbreviateAddress(wallet.address)}
            </Text>
          </View>
          <View style={styles.shareControl}>
            <ShareControl share={wallet?.address ?? ''} />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={share} style={styles.shareButton}>
            <Text style={{ color: styledColors.white }}>
              {t('common.share')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.learnMore} onPress={goToQuaiPayInfo}>
            <Text style={styles.learnMoreText}>Learn more about QuaiPay</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.completeButton}
          onPress={RootNavigator.goHome}
        >
          <Text style={{ color: styledColors.white }}>
            {t('receive.qrScreen.complete')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
  },
  walletCard: {
    borderRadius: 8,
    marginTop: 12,
    marginHorizontal: 16,
    paddingVertical: 36,
  },
  requestedAmount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainAmount: {
    ...fontStyle.fontH2,
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  username: {
    ...fontStyle.fontH2,
    fontSize: 20,
  },
  shareControl: {
    marginTop: 20,
    alignItems: 'center',
  },
  shareButton: {
    borderRadius: 8,
    backgroundColor: styledColors.normal,
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 140,
  },
  learnMore: {
    marginTop: 12,
    marginBottom: 20,
  },
  learnMoreText: {
    ...fontStyle.fontSmallText,
    color: styledColors.gray,
    textDecorationLine: 'underline',
  },
  completeButton: {
    alignItems: 'center',
    backgroundColor: styledColors.gray,
    marginHorizontal: 30,
    borderRadius: 8,
    paddingVertical: 16,
  },
  exchangeUnit: {
    width: 90,
    height: 24,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: styledColors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginLeft: 8,
    marginTop: 10,
  },
});
