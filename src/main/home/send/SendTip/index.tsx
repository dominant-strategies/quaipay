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
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SendStackParamList } from '../SendStack';
import { fontStyle, styledColors } from 'src/shared/styles';
import { abbreviateAddress } from 'src/shared/services/quais';
import { Currency } from 'src/shared/types';
import { QuaiPayText } from 'src/shared/components';
import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';

type SendTipScreenProps = NativeStackScreenProps<SendStackParamList, 'SendTip'>;

const SendTipScreen = ({ route, navigation }: SendTipScreenProps) => {
  const { address, receiver, input, amountInUSD } = route.params;
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  const [selectedTip, setSelectedTip] = useState<any>(0);
  const [customTip, setCustomTip] = useState('0');

  const handleTipPress = (tipPercentage: any) => {
    if (tipPercentage === 'custom') {
      setSelectedTip(selectedTip === 'custom' ? null : 'custom');
    } else {
      setSelectedTip(tipPercentage);
    }
  };

  const calculateTipAmount = (_amount: number, tipPercentage: number) => {
    let tips: any = {};

    if (tipPercentage === 0) {
      return {
        tipAmount: 0,
        message: t('home.send.noTip'),
        totalAmount: `${input.value}`,
        total: Number(input.value),
      };
    }

    let tipAmount =
      selectedTip === 'custom'
        ? Number(customTip)
        : (Number(input.value) * tipPercentage) / 100;

    if (isNaN(tipPercentage)) {
      tipAmount = parseFloat(customTip);
      tips = {
        customTip,
        message:
          input.unit === Currency.USD
            ? `$${parseFloat(customTip).toFixed(2)} ${t('home.send.tip')}`
            : `${parseFloat(customTip)} ${input.unit} ${t('home.send.tip')}`,
        total:
          input.unit === Currency.USD
            ? (Number(input.value) + parseFloat(customTip)).toFixed(2)
            : Number(input.value) + parseFloat(customTip),
        totalAmount:
          input.unit === Currency.USD
            ? `$${parseFloat(
                (Number(input.value) + parseFloat(customTip)).toFixed(6),
              )}`
            : `${parseFloat(
                Number(input.value) + parseFloat(customTip).toFixed(6),
              )}`,
      };
    } else {
      tipAmount = (Number(input.value) * tipPercentage) / 100;
      tips = {
        tipAmount,
        message:
          input.unit === Currency.USD
            ? `$${Number(tipAmount).toFixed(2)} ${t('home.send.tip')}`
            : `${parseFloat(Number(tipAmount).toFixed(6))} ${input.unit} ${t(
                'home.send.tip',
              )}`,
        total:
          input.unit === Currency.USD
            ? (Number(input.value) + Number(tipAmount)).toFixed(2)
            : Number(input.value) + Number(tipAmount),
        totalAmount:
          input.unit === Currency.USD
            ? `$${parseFloat(
                (Number(input.value) + Number(tipAmount)).toFixed(6),
              )}`
            : `${parseFloat(
                Number(input.value) + Number(tipAmount).toFixed(6),
              )}`,
      };
    }

    return tips;
  };

  const isButtonSelected = (tipPercentage: any) => {
    return selectedTip === tipPercentage;
  };

  const navigateToOverview = () => {
    let tipInUSD = 0;
    if (input.unit === Currency.USD) {
      tipInUSD =
        selectedTip === 'custom'
          ? Number(customTip) * EXCHANGE_RATE
          : ((Number(amountInUSD) * selectedTip) / 100) * EXCHANGE_RATE;
    } else {
      tipInUSD =
        selectedTip === 'custom'
          ? Number(customTip) * EXCHANGE_RATE
          : (Number(selectedTip) / 100) * EXCHANGE_RATE;
    }
    navigation.navigate('SendOverview', {
      ...route.params,
      totalAmount:
        selectedTip === 'custom'
          ? calculateTipAmount(
              Number(input.value),
              Number(customTip),
            ).total.toString()
          : calculateTipAmount(
              Number(input.value),
              Number(selectedTip),
            ).total.toString(),
      tip:
        selectedTip === 'custom'
          ? parseFloat(Number(customTip).toFixed(6))
          : parseFloat((Number(amountInUSD) * selectedTip).toFixed(6)) / 100,
      tipInUSD: parseFloat(tipInUSD.toFixed(6)).toString(),
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

  return (
    <DismissKeyboard>
      <SafeAreaView style={backgroundStyle}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <View style={styles.mainContainer}>
            <View style={styles.container}>
              <QuaiPayText style={styles.username}>
                {t('common:to')} {receiver}
              </QuaiPayText>
              <QuaiPayText themeColor="secondary">
                {abbreviateAddress(address)}
              </QuaiPayText>
            </View>
            <QuaiPayText style={styles.tipText}>
              {t('home.send.includeTip')}
            </QuaiPayText>
            <View style={styles.amountContainer}>
              <View style={styles.balanceContainer}>
                <QuaiPayText style={fontStyle.fontH1}>
                  {
                    calculateTipAmount(Number(input.value), Number(selectedTip))
                      .totalAmount
                  }
                </QuaiPayText>
                <QuaiPayText type="H1" themeColor="secondary">
                  {` ${input.unit}`}
                </QuaiPayText>
              </View>
              <QuaiPayText type="paragraph">
                {renderEquivalentAmount()}
              </QuaiPayText>
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
                    onChangeText={text => setCustomTip(text.replace(',', '.'))}
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
              style={[
                styles.button,
                styles.selectedButton,
                styles.continueButton,
              ]}
            >
              <QuaiPayText
                type="H3"
                style={{
                  color: styledColors.white,
                }}
              >
                {t('common.continue')}
              </QuaiPayText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

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
    backgroundColor: styledColors.border,
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
});

export default SendTipScreen;
