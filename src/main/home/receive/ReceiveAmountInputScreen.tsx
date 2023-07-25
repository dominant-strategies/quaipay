import React from 'react';
import { StyleSheet, Text, View, useColorScheme, Image } from 'react-native';
import { useTranslation } from 'react-i18next';

import { fontStyle, styledColors } from 'src/shared/styles';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';
import { useAmountInput } from 'src/shared/hooks/useAmountInput';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayInputDisplay,
  QuaiPayKeyboard,
  QuaiPayText,
} from 'src/shared/components';
import { Currency } from 'src/shared/types';
import { abbreviateAddress } from 'src/shared/services/quais';
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';

import { ReceiveStackScreenProps } from './ReceiveStack';

// TODO: improve L&F by using flex
export const ReceiveAmountInputScreen: React.FC<
  ReceiveStackScreenProps<'ReceiveAmountInput'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const profilePicture = useProfilePicture();
  const username = useUsername();
  const wallet = useWallet();
  const quaiRate = useQuaiRate();
  const { eqInput, input, keyboard, onSwap } = useAmountInput(
    undefined,
    quaiRate,
  );

  const textColor = {
    color: isDarkMode ? styledColors.white : styledColors.black,
  };

  const goToGeneratedQR = () =>
    navigation.navigate('ReceiveQR', {
      amount: Number(input.unit === Currency.USD ? input.value : eqInput.value),
    });

  return (
    <QuaiPayContent title={t('common.request')}>
      <View style={styles.separator} />
      <View style={styles.walletCardStyle}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: profilePicture }} />
          <Text style={[textColor, styles.username]}>{username}</Text>
          <Text style={[textColor, styles.wallet]}>
            {wallet && abbreviateAddress(wallet.address)}
          </Text>
        </View>
        <View style={styles.inputDisplayContainer}>
          <QuaiPayInputDisplay
            prefix={input.unit === 'USD' ? '$' : undefined}
            suffix={` ${input.unit}`}
            value={input.value}
          />
        </View>
        <View style={styles.row}>
          <QuaiPayText>
            {eqInput.unit === 'USD' && '$'}
            {eqInput.value} {eqInput.unit}
          </QuaiPayText>
          <QuaiPayButton
            pill
            outlined
            type="secondary"
            titleType="default"
            title={input.unit}
            onPress={onSwap}
            style={styles.swapButton}
            containerStyle={styles.swapButtonContainer}
            RightIcon={
              <ExchangeIcon
                color={isDarkMode ? styledColors.white : styledColors.black}
              />
            }
          />
        </View>
      </View>
      <QuaiPayButton
        onPress={goToGeneratedQR}
        style={styles.continueButton}
        title={t('common.continue')}
      />
      <View style={styles.separator} />
      <QuaiPayKeyboard
        handleLeftButtonPress={keyboard.onDecimalButtonPress}
        handleRightButtonPress={keyboard.onDeleteButtonPress}
        onInputButtonPress={keyboard.onInputButtonPress}
      />
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  walletCardStyle: {
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  swapButton: {
    paddingVertical: 6,
  },
  swapButtonContainer: {
    width: 75,
  },
  xUnit: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 24,
    color: styledColors.black,
  },
  continueButton: {
    marginTop: 44,
    marginHorizontal: 16,
  },
  inputDisplayContainer: {
    marginTop: 16,
  },
  image: {
    borderRadius: 70,
    height: 60,
    width: 60,
  },
  container: {
    alignItems: 'center',
  },
  username: {
    ...fontStyle.fontH3,
    marginTop: 8,
    fontSize: 14,
  },
  wallet: {
    ...fontStyle.fontSmallText,
  },
  separator: {
    flex: 1,
  },
});
