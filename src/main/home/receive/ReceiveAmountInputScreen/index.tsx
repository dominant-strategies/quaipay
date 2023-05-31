import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReceiveStackParamList } from '../ReceiveStack';
import { styledColors } from 'src/styles';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { EUnit } from './types';

type ReceiveAmountInputProps = NativeStackScreenProps<
  ReceiveStackParamList,
  'ReceiveAmountInput'
>;

export const ReceiveAmountInputScreen = ({}: ReceiveAmountInputProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [amount] = useState('0.00');
  const [unit, setUnit] = useState(EUnit.USD);

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

  const onSwap = () => {
    const result = unit === EUnit.USD ? EUnit.QUAI : EUnit.USD;
    setUnit(result);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={[
          styles.walletCardStyle,
          {
            backgroundColor: isDarkMode
              ? styledColors.dark
              : styledColors.white,
            borderColor: isDarkMode
              ? styledColors.darkGray
              : styledColors.lightGray,
          },
        ]}
      >
        <Text style={[styles.amountUnit, equivalentUnitTextColorStyle]}>
          ${amount} {unit}
        </Text>
        <Text style={[styles.xUnit, textColor]}>XXX.XXX {unit}</Text>
        <TouchableOpacity onPress={onSwap} style={[styles.exchangeUnit]}>
          <Text style={[textColor]}>{unit}</Text>
          <ExchangeIcon
            color={isDarkMode ? styledColors.white : styledColors.black}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  switchStyle: {
    marginTop: 40,
  },
  walletCardStyle: {
    marginTop: 66,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: styledColors.lightGray,
    height: 426,
  },
  walletView: {
    marginTop: 16.5,
  },
  buttonAreaInfo: {
    marginTop: 15,
  },
  learnMoreAreaInfo: {
    marginTop: 15,
  },
  learnMoreText: {
    color: styledColors.gray,
    textDecorationLine: 'underline',
  },
  requestView: {
    backgroundColor: '#0066FF',
    height: 42,
    borderRadius: 8,
    verticalAlign: 'middle',
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  shareTxt: {
    color: '#fff',
  },
  exchangeUnit: {
    width: 90,
    height: 24,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 9.5,
  },
  amountUnit: { textAlign: 'center', marginTop: 35 },
  xUnit: { textAlign: 'center', marginTop: 5, fontSize: 24, color: '#000' },
});
