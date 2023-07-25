import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { fontStyle, styledColors } from 'src/shared/styles';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';
import { useAmountInput } from 'src/shared/hooks/useAmountInput';
import {
  QuaiPayContent,
  QuaiPayInputDisplay,
  QuaiPayKeyboard,
} from 'src/shared/components';
import { Currency } from 'src/shared/types';
import { abbreviateAddress } from 'src/shared/services/quais';

import { ReceiveStackScreenProps } from '../ReceiveStack';
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';

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

  const equivalentUnitTextColorStyle = {
    color: isDarkMode ? styledColors.gray : styledColors.black,
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
        <View style={[styles.row, styles.inputDisplayContainer]}>
          <QuaiPayInputDisplay
            prefix={input.unit === 'USD' ? '$' : undefined}
            suffix={` ${input.unit}`}
            value={input.value}
          />
        </View>
        <View style={styles.row}>
          <Text style={[styles.amountUnit, equivalentUnitTextColorStyle]}>
            {eqInput.unit === 'USD' && '$'}
            {eqInput.value} {eqInput.unit}
          </Text>
          <TouchableOpacity onPress={onSwap} style={[styles.exchangeUnit]}>
            <Text style={textColor}>{input.unit}</Text>
            <ExchangeIcon
              color={isDarkMode ? styledColors.white : styledColors.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={goToGeneratedQR} style={styles.continueButton}>
        <Text style={{ color: styledColors.white }}>
          {t('common.continue')}
        </Text>
      </TouchableOpacity>
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
  amountUnit: {
    marginTop: 10,
  },
  xUnit: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 24,
    color: styledColors.black,
  },
  continueButton: {
    borderRadius: 8,
    backgroundColor: styledColors.normal,
    marginTop: 44,
    alignSelf: 'center',
    marginHorizontal: 16,
    paddingVertical: 16,
    paddingHorizontal: 132,
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
