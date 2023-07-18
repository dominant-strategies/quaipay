import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  QuaiPayContent,
  QuaiPayInputDisplay,
  QuaiPayQRCode,
  QuaiPayText,
} from 'src/shared/components';
import { fontStyle, styledColors } from 'src/shared/styles';
import {
  useAmountInput,
  useThemedStyle,
  useUsername,
  useWallet,
} from 'src/shared/hooks';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { RootNavigator } from 'src/shared/navigation/utils';
import { Currency, Theme } from 'src/shared/types';
import { abbreviateAddress } from 'src/shared/services/quais';

import { ReceiveStackScreenProps } from 'src/main/home/receive/ReceiveStack';
import ShareControl from 'src/main/home/receive/ShareControl';

export const ReceiveQRScreen: React.FC<
  ReceiveStackScreenProps<'ReceiveQR'>
> = ({ route }) => {
  const { amount } = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const username = useUsername();
  const wallet = useWallet();

  const { input, eqInput, onSwap } = useAmountInput(amount.toString());
  const share = () => console.log('Share triggered');
  const goToQuaiPayInfo = () => console.log('Go to QuaiPay Info');
  const styles = useThemedStyle(themedStyle);

  return (
    <QuaiPayContent hasBackgroundVariant title={t('common.request')}>
      <ScrollView>
        <View style={styles.walletCard}>
          <View style={styles.requestedAmount}>
            <QuaiPayText themeColor="secondary">
              {eqInput.unit === Currency.USD && '$'}
              {eqInput.value} {eqInput.unit}
            </QuaiPayText>
            <QuaiPayInputDisplay
              prefix={input.unit === 'USD' ? '$' : undefined}
              suffix={` ${input.unit}`}
              value={input.value}
            />
            <TouchableOpacity onPress={onSwap} style={styles.exchangeUnit}>
              <QuaiPayText>{eqInput.unit}</QuaiPayText>
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
            <QuaiPayText>{username}</QuaiPayText>
            <QuaiPayText style={[fontStyle.fontParagraph]}>
              {wallet && abbreviateAddress(wallet.address)}
            </QuaiPayText>
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

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    safeAreaView: {
      width: '100%',
      height: '100%',
    },
    walletCard: {
      borderRadius: 8,
      marginTop: 12,
      marginHorizontal: 16,
      paddingVertical: 36,
      backgroundColor: theme.surface,
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
