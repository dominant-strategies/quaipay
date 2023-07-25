import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SendStackParamList } from '../SendStack';
import { fontStyle, styledColors } from 'src/shared/styles';
import { abbreviateAddress } from 'src/shared/services/quais';
import { Currency } from 'src/shared/types';
import {
  QuaiPayContent,
  QuaiPayKeyboard,
  QuaiPayText,
} from 'src/shared/components';
import { EXCHANGE_RATE } from 'src/shared/constants/exchangeRate';
import { useAmountInput } from 'src/shared/hooks';
import { TipButton } from 'src/main/home/send/SendTip/TipButton';

type SendTipScreenProps = NativeStackScreenProps<SendStackParamList, 'SendTip'>;

const SendTipScreen = ({ route, navigation }: SendTipScreenProps) => {
  const { receiverAddress, receiverUsername, input, amountInUSD } =
    route.params;
  const { t } = useTranslation();

  const [selectedTip, setSelectedTip] = useState<any>(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { keyboard, input: tipInput } = useAmountInput(`${amountInUSD}`);

  const handleTipPress = (tipPercentage: any) => {
    if (tipPercentage === 'custom') {
      setKeyboardVisible(true);
    } else {
      setKeyboardVisible(false);
    }
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

    if (isNaN(tipPercentage)) {
      tips = {
        customTip: tipInput,
        message:
          input.unit === Currency.USD
            ? `$${parseFloat(tipInput.value).toFixed(2)} ${t('home.send.tip')}`
            : `${parseFloat(tipInput.value)} ${input.unit} ${t(
                'home.send.tip',
              )}`,
        total:
          input.unit === Currency.USD
            ? (Number(input.value) + parseFloat(tipInput.value)).toFixed(2)
            : Number(input.value) + parseFloat(tipInput.value),
        totalAmount:
          input.unit === Currency.USD
            ? `$${parseFloat(
                (Number(input.value) + parseFloat(tipInput.value)).toFixed(6),
              )}`
            : `${parseFloat(
                Number(input.value) + parseFloat(tipInput.value).toFixed(6),
              )}`,
      };
    } else {
      const tipAmount = (Number(input.value) * tipPercentage) / 100;
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
    let tipInUSD: number;
    if (input.unit === Currency.USD) {
      tipInUSD =
        selectedTip === 'custom'
          ? Number(tipInput.value) * EXCHANGE_RATE
          : ((Number(amountInUSD) * selectedTip) / 100) * EXCHANGE_RATE;
    } else {
      tipInUSD =
        selectedTip === 'custom'
          ? Number(tipInput.value) * EXCHANGE_RATE
          : (Number(selectedTip) / 100) * EXCHANGE_RATE;
    }
    navigation.navigate('SendOverview', {
      ...route.params,
      totalAmount:
        selectedTip === 'custom'
          ? calculateTipAmount(
              Number(input.value),
              Number(tipInput.value),
            ).total.toString()
          : calculateTipAmount(
              Number(input.value),
              Number(selectedTip),
            ).total.toString(),
      tip:
        selectedTip === 'custom'
          ? parseFloat(Number(tipInput.value).toFixed(6))
          : parseFloat((Number(amountInUSD) * selectedTip).toFixed(6)) / 100,
      tipInUSD: parseFloat(tipInUSD.toFixed(6)).toString(),
    });
  };

  const handleCustomTip = () => {
    if (selectedTip === 'custom') {
      return `${Number(tipInput.value)} ${input.unit} ${t('home.send.tip')}`;
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

  return (
    <QuaiPayContent title={t('home.send.label')}>
      <TouchableWithoutFeedback onPress={() => setKeyboardVisible(false)}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <QuaiPayText style={styles.username}>
              {t('common:to')} {receiverUsername}
            </QuaiPayText>
            <QuaiPayText themeColor="secondary">
              {abbreviateAddress(receiverAddress)}
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
            <TipButton
              isButtonSelected={isButtonSelected(0)}
              handleTipPress={() => handleTipPress(0)}
              buttonText={t('home.send.noTip')}
            />
            <TipButton
              isButtonSelected={isButtonSelected(10)}
              handleTipPress={() => handleTipPress(10)}
              buttonText={`10% ${
                calculateTipAmount(Number(input.value), 10).message
              }`}
            />
            <TipButton
              isButtonSelected={isButtonSelected(15)}
              handleTipPress={() => handleTipPress(15)}
              buttonText={`15% ${
                calculateTipAmount(Number(input.value), 15).message
              }`}
            />
            <TipButton
              isButtonSelected={isButtonSelected(20)}
              handleTipPress={() => handleTipPress(20)}
              buttonText={`20% ${
                calculateTipAmount(Number(input.value), 20).message
              }`}
            />
            <TipButton
              isButtonSelected={isButtonSelected(25)}
              handleTipPress={() => handleTipPress(25)}
              buttonText={`25% ${
                calculateTipAmount(Number(input.value), 25).message
              }`}
            />
            <TipButton
              isButtonSelected={isButtonSelected('custom')}
              handleTipPress={() => handleTipPress('custom')}
              buttonText={t('home.send.customTip')}
            />
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
          <View style={styles.keyboardContainer}>
            <TouchableWithoutFeedback onPress={() => setKeyboardVisible(true)}>
              <QuaiPayKeyboard
                handleLeftButtonPress={keyboard.onDecimalButtonPress}
                handleRightButtonPress={keyboard.onDeleteButtonPress}
                onInputButtonPress={keyboard.onInputButtonPress}
                visible={keyboardVisible}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </QuaiPayContent>
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
  keyboardContainer: {
    bottom: 0,
    position: 'absolute',
  },
});

export default SendTipScreen;
