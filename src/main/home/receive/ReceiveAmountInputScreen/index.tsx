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
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReceiveStackParamList } from '../ReceiveStack';
import { styledColors } from 'src/styles';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { useReceiveInput } from './hooks';

type ReceiveAmountInputProps = NativeStackScreenProps<
  ReceiveStackParamList,
  'ReceiveAmountInput'
>;

export const ReceiveAmountInputScreen = ({}: ReceiveAmountInputProps) => {
  const isDarkMode = useColorScheme() === 'dark';
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
          {eqInput.unit === 'USD' && '$'}
          {eqInput.value} {eqInput.unit}
        </Text>
        <View style={styles.column}>
          <Text style={[styles.xUnit, textColor]}>
            {input.unit === 'USD' && '$'}
          </Text>
          <TextInput
            ref={inputRef}
            style={[styles.xUnit, textColor]}
            value={input.value}
            onChangeText={onInputChange}
            keyboardAppearance={isDarkMode ? 'dark' : 'light'}
            keyboardType={Platform.OS === 'android' ? 'numeric' : 'decimal-pad'}
          />
          <Text style={[styles.xUnit, textColor]}>{` ${input.unit}`}</Text>
        </View>
        <TouchableOpacity onPress={onSwap} style={[styles.exchangeUnit]}>
          <Text style={textColor}>{input.unit}</Text>
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
  column: {
    flexDirection: 'row',
    justifyContent: 'center',
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
