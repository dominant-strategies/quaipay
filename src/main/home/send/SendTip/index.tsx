import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SendStackParamList } from '../SendStack';
import { fontStyle, styledColors } from 'src/shared/styles';
import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';
import { abbreviateAddress } from 'src/shared/services/quais';
import { Currency } from 'src/shared/types';

type SendTipScreenProps = NativeStackScreenProps<SendStackParamList, 'SendTip'>;

const SendTipScreen = ({ route }: SendTipScreenProps) => {
  const { address, username, input, amountInUSD, amountInQUAI } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const [selectedTip, setSelectedTip] = useState<any>(0);
  const [customTip, setCustomTip] = useState('');

  const handleTipPress = (tipPercentage: any) => {
    if (tipPercentage === 'custom') {
      setSelectedTip(selectedTip === 'custom' ? null : 'custom');
    } else {
      setSelectedTip(tipPercentage);
    }
  };

  const calculateTipAmount = (_amount: number, tipPercentage: number) => {
    if (tipPercentage === 0) {
      return {
        tipAmount: 0,
        message: t('home.send.noTip'),
        totalAmount: Number(input.value),
        total: Number(input.value),
      };
    }
    const tipAmount =
      selectedTip === 'custom'
        ? Number(customTip)
        : (Number(input.value) * tipPercentage) / 100;

    return {
      tipAmount,
      message:
        input.unit === Currency.USD
          ? `$${Number(tipAmount).toFixed(2)} ${t('home.send.tip')}`
          : `${Number(tipAmount)} ${input.unit} ${t('home.send.tip')}`,
      total:
        input.unit === Currency.USD
          ? (Number(input.value) + Number(tipAmount)).toFixed(2)
          : Number(input.value) + Number(tipAmount),
      totalAmount:
        input.unit === Currency.USD
          ? `$${(Number(input.value) + Number(tipAmount)).toFixed(2)}`
          : `${Number(input.value) + Number(tipAmount)}`,
    };
  };

  const isButtonSelected = (tipPercentage: any) => {
    return selectedTip === tipPercentage;
  };

  const navigateToOverview = () => {
    // @ts-ignore
    navigation.navigate('SendStack', {
      screen: 'SendOverview',
      params: {
        ...route.params,
        totalAmount: calculateTipAmount(
          Number(input.value),
          Number(selectedTip),
        ).total,
        totalAmountInUSD:
          Number(
            calculateTipAmount(Number(input.value), Number(selectedTip)).total,
          ) * EXCHANGE_RATE,
        tip:
          selectedTip === 'custom'
            ? Number(customTip)
            : ((Number(amountInUSD) * selectedTip) / 100).toFixed(5).toString(),
        tipInQUAI:
          selectedTip === 'custom'
            ? (input.unit === Currency.USD
                ? Number(customTip)
                : Number(customTip) / EXCHANGE_RATE
              ).toString()
            : (Number(amountInQUAI) * selectedTip) / 100,
      },
    });
  };

  const handleCustomTip = () => {
    if (selectedTip === 'custom') {
      return `${Number(customTip)} ${input.unit} ${t('home.send.tip')}`;
    } else {
      return calculateTipAmount(Number(input.value), Number(selectedTip))
        .message;
    }
  };

  const renderEquivalentAmount = () => {
    return input.unit === Currency.USD
      ? `$${input.value} + ${handleCustomTip()}`
      : `${input.value} ${input.unit} + ${handleCustomTip()}`;
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
  };

  const textColor = {
    color: isDarkMode ? styledColors.white : styledColors.black,
  };

  const lightTextColor = {
    color: isDarkMode ? '#808080' : '#808080',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Text style={[textColor, styles.username]}>
            {t('common:to')} {username}
          </Text>
          <Text style={[lightTextColor, styles.wallet]}>
            {abbreviateAddress(address)}
          </Text>
        </View>
        <Text style={[textColor, styles.tipText]}>
          {t('home.send.includeTip')}
        </Text>
        <View style={styles.amountContainer}>
          <View style={styles.balanceContainer}>
            <Text style={[fontStyle.fontH1, textColor]}>
              {
                calculateTipAmount(Number(input.value), Number(selectedTip))
                  .totalAmount
              }
            </Text>
            <Text style={[fontStyle.fontH1, lightTextColor]}>
              {` ${input.unit}`}
            </Text>
          </View>
          <Text style={[textColor, fontStyle.fontParagraph]}>
            {renderEquivalentAmount()}
          </Text>
        </View>
        <View style={styles.container}>
          {/* TODO: Create a reusable component for the buttons */}
          <TouchableOpacity
            style={[
              styles.button,
              isButtonSelected(0) && styles.selectedButton,
            ]}
            onPress={() => handleTipPress(0)}
          >
            <Text
              style={{
                color: isButtonSelected(0)
                  ? styledColors.white
                  : styledColors.black,
              }}
            >
              {t('home.send.noTip')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              isButtonSelected(15) && styles.selectedButton,
            ]}
            onPress={() => handleTipPress(15)}
          >
            <Text
              style={{
                color: isButtonSelected(15)
                  ? styledColors.white
                  : styledColors.black,
              }}
            >
              15% ({calculateTipAmount(Number(input.value), 15).message})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              isButtonSelected(20) && styles.selectedButton,
            ]}
            onPress={() => handleTipPress(20)}
          >
            <Text
              style={{
                color: isButtonSelected(20)
                  ? styledColors.white
                  : styledColors.black,
              }}
            >
              20% ({calculateTipAmount(Number(input.value), 20).message})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              isButtonSelected(25) && styles.selectedButton,
            ]}
            onPress={() => handleTipPress(25)}
          >
            <Text
              style={{
                color: isButtonSelected(25)
                  ? styledColors.white
                  : styledColors.black,
              }}
            >
              25% ({calculateTipAmount(Number(input.value), 25).message})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              isButtonSelected('custom') && styles.selectedButton,
              isButtonSelected('custom') && styles.customButton,
            ]}
            onPress={() => handleTipPress('custom')}
          >
            {selectedTip === 'custom' ? (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: isButtonSelected('custom')
                      ? styledColors.white
                      : styledColors.gray,
                  },
                ]}
                placeholder={t('home.send.tipPlaceholder') as string}
                placeholderTextColor={styledColors.white}
                value={customTip}
                onChangeText={setCustomTip}
                keyboardType="numeric"
              />
            ) : (
              <Text
                style={{
                  color: isButtonSelected('custom')
                    ? styledColors.white
                    : styledColors.black,
                }}
              >
                {t('home.send.customTip')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={navigateToOverview}
          style={[styles.button, styles.selectedButton, styles.continueButton]}
        >
          <Text
            style={{
              color: styledColors.white,
            }}
          >
            {t('common.continue')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#d5d5d5',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 16,
    maxHeight: 50,
  },
  selectedButton: {
    backgroundColor: '#0066FF',
    alignSelf: 'center',
  },
  customButton: {
    padding: 0,
    paddingVertical: 0,
  },
  continueButton: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    maxHeight: 50,
    textAlign: 'center',
  },
  username: {
    ...fontStyle.fontH3,
    marginTop: 16,
    fontSize: 14,
  },
  wallet: {
    ...fontStyle.fontSmallText,
  },
});

export default SendTipScreen;
