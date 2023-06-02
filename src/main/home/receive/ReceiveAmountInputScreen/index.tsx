import React, { useLayoutEffect, useRef, useState } from 'react';
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
  const inputRef = useRef<TextInput>(null);
  const [amount, setAmount] = useState('0.00');
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
        <Text style={[styles.amountUnit, equivalentUnitTextColorStyle]}>
          ${amount} {unit}
        </Text>
        <TextInput
          ref={inputRef}
          style={[styles.xUnit, textColor]}
          value={amount}
          onChangeText={setAmount}
          keyboardAppearance={isDarkMode ? 'dark' : 'light'}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'decimal-pad'}
        />
        <TouchableOpacity onPress={onSwap} style={[styles.exchangeUnit]}>
          <Text style={textColor}>{unit}</Text>
          <ExchangeIcon
            color={isDarkMode ? styledColors.white : styledColors.black}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  walletCardStyle: {
    marginTop: 80,
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
