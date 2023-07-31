import React, { useEffect, useLayoutEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayAmountDisplay,
  QuaiPayKeyboard,
  QuaiPayText,
} from 'src/shared/components';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import Eye from 'src/shared/assets/eyeOutline.svg';
import EyeClosed from 'src/shared/assets/hide.svg';
import { useAmountInput, useWallet } from 'src/shared/hooks';
import { abbreviateAddress, getBalance } from 'src/shared/services/quais';
import { Currency } from 'src/shared/types';
import { fontStyle, styledColors } from 'src/shared/styles';
import { useZone } from 'src/shared/hooks/useZone';
import { useQuaiRate } from 'src/shared/hooks/useQuaiRate';

import { SendStackParamList } from '../SendStack';

type SendAmountScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendAmount'
>;

const SendAmountScreen = ({ route, navigation }: SendAmountScreenProps) => {
  const { amount, receiverAddress, receiverUsername, receiverPFP, sender } =
    route.params;
  const { t } = useTranslation();
  const wallet = useWallet();
  const { zone } = useZone();
  const quaiRate = useQuaiRate();
  const isDarkMode = useColorScheme() === 'dark';
  const [quaiBalance, setQuaiBalance] = React.useState(0);
  const [hideBalance, setHideBalance] = React.useState(false);
  const inputRef = useRef<TextInput>(null);
  const { eqInput, input, keyboard, onSwap } = useAmountInput(
    `${amount}`,
    quaiRate,
  );

  const shouldDisableContinueButtons =
    Number(input.value) === 0 || Number(eqInput.value) === 0;

  const equivalentUnitTextColorStyle = {
    color: isDarkMode ? styledColors.gray : styledColors.black,
  };

  const goToTip = () => {
    const amountInUSD =
      input.unit === Currency.USD ? input.value : eqInput.value;
    const amountInQUAI =
      input.unit === Currency.QUAI ? input.value : eqInput.value;
    if (!input.value) {
      // TODO: show friendly error message
      return;
    }
    if (Number(amountInQUAI) > quaiBalance) {
      // TODO: show friendly error message
      // return;
    }

    navigation.navigate('SendTip', {
      sender,
      amountInUSD,
      amountInQUAI,
      eqInput,
      input,
      receiverAddress,
      receiverPFP,
      receiverUsername,
    });
  };

  const goToOverview = () => {
    const amountInUSD =
      input.unit === Currency.USD ? input.value : eqInput.value;
    const amountInQUAI =
      input.unit === Currency.QUAI ? input.value : eqInput.value;
    if (!input.value) {
      // TODO: show friendly error message
      return;
    }
    if (Number(amountInQUAI) > quaiBalance) {
      // TODO: show friendly error message
      // return;
    }

    navigation.navigate('SendOverview', {
      sender,
      amountInUSD,
      amountInQUAI,
      eqInput: eqInput,
      input: input,
      receiverAddress: receiverAddress,
      receiverPFP,
      receiverUsername,
      totalAmount: amountInUSD,
      tip: 0,
      tipInUSD: '0',
    });
  };

  useEffect(() => {
    if (wallet && quaiRate) {
      getBalance(wallet.address, zone, quaiRate.base).then(balance =>
        setQuaiBalance(balance.balanceInQuai),
      );
    }
  }, [wallet]);

  useLayoutEffect(() => {
    if (inputRef && !amount) {
      inputRef.current?.focus();
    }
  }, [inputRef]);

  return (
    <QuaiPayContent title={t('home.send.label')}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: receiverPFP }} />
          <QuaiPayText type="H3" style={styles.receiver}>
            {t('common.to')} {receiverUsername}
          </QuaiPayText>
          <QuaiPayText style={styles.wallet}>
            {abbreviateAddress(receiverAddress)}
          </QuaiPayText>
        </View>
        <View>
          <View style={styles.balanceContainer}>
            <Text
              style={{
                color: styledColors.gray,
              }}
            >
              {t('home.send.yourBalance')}
              {hideBalance ? 'X.XX' : quaiBalance.toFixed(5)} QUAI
            </Text>
            <TouchableOpacity
              onPress={() => setHideBalance(!hideBalance)}
              style={styles.balanceIcon}
            >
              {hideBalance ? <EyeClosed /> : <Eye />}
            </TouchableOpacity>
          </View>
          <View style={[styles.row, styles.marginTop16]}>
            <QuaiPayAmountDisplay
              prefix={input.unit === Currency.USD ? '$' : undefined}
              value={input.value}
              suffix={` ${input.unit}`}
            />
          </View>
          <View style={styles.inputBorder} />
        </View>
        <View style={styles.row}>
          <Text style={[styles.amountUnit, equivalentUnitTextColorStyle]}>
            {eqInput.unit === Currency.USD && '$'}
            {eqInput.value} {eqInput.unit}
          </Text>
          <TouchableOpacity onPress={onSwap} style={[styles.exchangeUnit]}>
            <QuaiPayText>{eqInput.unit}</QuaiPayText>
            <ExchangeIcon
              color={isDarkMode ? styledColors.white : styledColors.black}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <QuaiPayButton
            disabled={shouldDisableContinueButtons}
            onPress={goToTip}
            outlined
            style={styles.continueButton}
            title={t('home.send.includeTip')}
            type="secondary"
          />
          <QuaiPayButton
            onPress={goToOverview}
            style={styles.continueButton}
            disabled={shouldDisableContinueButtons}
            title={t('common.continue')}
          />
        </View>
      </ScrollView>
      {!amount && (
        <View style={styles.keyboardContainer}>
          <QuaiPayKeyboard
            handleLeftButtonPress={keyboard.onDecimalButtonPress}
            handleRightButtonPress={keyboard.onDeleteButtonPress}
            onInputButtonPress={keyboard.onInputButtonPress}
          />
        </View>
      )}
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    justifyContent: 'flex-end',
  },
  scrollView: {
    flex: 1,
    paddingVertical: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 16,
    paddingTop: 48,
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
  inputBorder: {
    backgroundColor: styledColors.normal,
    width: '60%',
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
  },
  balanceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
    flexDirection: 'row',
  },
  balanceIcon: {
    marginLeft: 8,
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 32,
    marginBottom: 48,
    height: 145,
  },
  continueButton: {
    alignSelf: 'center',
    paddingVertical: 16,
    width: '80%',
  },
  tipButton: {
    borderRadius: 5,
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 16,
    width: '80%',
    alignItems: 'center',
    maxHeight: 48,
    marginBottom: 12,
  },
  marginTop16: {
    marginTop: 16,
    alignSelf: 'center',
  },
  image: {
    borderRadius: 70,
    height: 60,
    width: 60,
  },
  container: {
    alignItems: 'center',
  },
  receiver: {
    marginTop: 8,
    fontSize: 14,
  },
  wallet: {
    ...fontStyle.fontSmallText,
  },
});

export default SendAmountScreen;
