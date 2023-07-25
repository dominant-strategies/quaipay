import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import UploadIcon from 'src/shared/assets/upload.svg';
import {
  QuaiPayButton,
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
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';

export const ReceiveQRScreen: React.FC<
  ReceiveStackScreenProps<'ReceiveQR'>
> = ({ route }) => {
  const { amount } = route.params;
  const { t } = useTranslation();
  const username = useUsername();
  const wallet = useWallet();
  const quaiRate = useQuaiRate();

  const { input, eqInput, onSwap } = useAmountInput(
    amount.toString(),
    quaiRate,
  );
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
            <QuaiPayButton
              pill
              outlined
              type="secondary"
              titleType="default"
              title={input.unit}
              onPress={onSwap}
              style={styles.swapButton}
              containerStyle={styles.swapButtonContainer}
              RightIcon={<ExchangeIcon color={styles.swapIcon.color} />}
            />
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
          <QuaiPayButton
            onPress={share}
            style={styles.shareButton}
            title={t('common.share')}
            RightIcon={<UploadIcon color={styledColors.white} />}
          />
          <TouchableOpacity style={styles.learnMore} onPress={goToQuaiPayInfo}>
            <Text style={styles.learnMoreText}>Learn more about QuaiPay</Text>
          </TouchableOpacity>
        </View>
        <QuaiPayButton
          bgColor="gray"
          title={t('receive.qrScreen.complete')}
          style={styles.completeButton}
          onPress={RootNavigator.goHome}
        />
      </ScrollView>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
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
      marginTop: 16,
      marginHorizontal: 16,
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
      marginHorizontal: 30,
    },
    swapButton: {
      paddingVertical: 6,
    },
    swapButtonContainer: {
      width: 75,
    },
    swapIcon: {
      color: theme.primary,
    },
  });
