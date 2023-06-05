import React, { useLayoutEffect, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { fontStyle, styledColors } from 'src/styles';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';

import { useReceiveInput } from './hooks';
import { ReceiveStackParamList } from '../ReceiveStack';
import { EUnit } from './types';

type ReceiveAmountInputProps = NativeStackScreenProps<
  ReceiveStackParamList,
  'ReceiveAmountInput'
>;

// TODO: implement in-house keyboard
// TODO: improve L&F by using flex
export const ReceiveAmountInputScreen = ({
  navigation,
}: ReceiveAmountInputProps) => {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const profilePicture = useProfilePicture();
  const username = useUsername();
  const wallet = useWallet();
  const inputRef = useRef<TextInput>(null);
  const { eqInput, input, onInputChange, onSwap } = useReceiveInput();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
  };

  const textColor = {
    color: isDarkMode ? styledColors.white : styledColors.black,
  };

  const equivalentUnitTextColorStyle = {
    color: isDarkMode ? styledColors.gray : styledColors.black,
  };

  const goToGeneratedQR = () =>
    navigation.navigate('ReceiveQR', {
      amount: Number(input.unit === EUnit.USD ? input.value : eqInput.value),
    });

  useLayoutEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.walletCardStyle}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: profilePicture }} />
          <Text style={[textColor, styles.username]}>{username}</Text>
          <Text style={[textColor, styles.wallet]}>
            {wallet &&
              `${wallet?.address.slice(0, 8)}...${wallet.address?.slice(-8)}`}
          </Text>
        </View>
        <View>
          <View style={[styles.row, styles.marginTop16]}>
            <Text style={[styles.xUnit, textColor]}>
              {input.unit === 'USD' && '$'}
            </Text>
            <TextInput
              ref={inputRef}
              style={[styles.xUnit, textColor]}
              value={input.value}
              onChangeText={onInputChange}
              keyboardAppearance={isDarkMode ? 'dark' : 'light'}
              keyboardType={
                Platform.OS === 'android' ? 'numeric' : 'decimal-pad'
              }
            />
            <Text style={[styles.xUnit, textColor]}>{` ${input.unit}`}</Text>
          </View>
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
        <TouchableOpacity
          onPress={goToGeneratedQR}
          style={[styles.continueButton]}
        >
          <Text style={{ color: styledColors.white }}>
            {t('common.continue')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  walletCardStyle: {
    marginTop: 80,
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
  marginTop16: {
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
});
