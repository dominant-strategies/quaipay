import React, { useEffect, useLayoutEffect, useRef } from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { QuaiPayInputDisplay, QuaiPayKeyboard } from 'src/shared/components';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { useAmountInput, useUsername, useWallet } from 'src/shared/hooks';
import { abbreviateAddress, getBalance } from 'src/shared/services/quais';
import { Currency } from 'src/shared/types';
import { fontStyle, styledColors } from 'src/shared/styles';

import { SendStackParamList } from '../SendStack';

type SendAmountScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendAmount'
>;

const SendAmountScreen = ({ route }: SendAmountScreenProps) => {
  const { amount, address, username } = route.params;
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const wallet = useWallet();
  const sender = useUsername();
  const [quaiBalance, setQuaiBalance] = React.useState(0);
  const [hideBalance, setHideBalance] = React.useState(false);
  const inputRef = useRef<TextInput>(null);
  const { eqInput, input, keyboard, onSwap } = useAmountInput(`${amount}`);

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

    // @ts-ignore
    navigation.navigate('SendStack', {
      screen: 'SendTip',
      params: {
        from: sender,
        amountInUSD,
        amountInQUAI,
        eqInput: eqInput,
        input: input,
        address,
        username,
        wallet,
      },
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

    // @ts-ignore
    navigation.navigate('SendStack', {
      screen: 'SendOverview',
      params: {
        from: sender,
        amountInUSD,
        amountInQUAI,
        eqInput: eqInput,
        input: input,
        address,
        username,
        wallet,
        totalAmount: amount,
        totalAmountInUSD: amountInUSD,
        tip: '0',
        tipInUSD: '0',
      },
    });
  };

  useEffect(() => {
    if (wallet) {
      getBalance(wallet.address).then(balance =>
        setQuaiBalance(balance.balanceInUsd),
      );
    }
  }, [wallet]);

  useLayoutEffect(() => {
    if (inputRef && !amount) {
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
          {/* <Image style={styles.image} source={{ uri: profilePicture }} /> */}
          <Text style={[textColor, styles.username]}>
            {t('common.to')} {username}
          </Text>
          <Text style={[textColor, styles.wallet]}>
            {abbreviateAddress(address)}
          </Text>
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
            <FontAwesome5
              name={hideBalance ? 'eye-slash' : 'eye'}
              size={12}
              color={styledColors.gray}
              style={styles.balanceIcon}
              onPress={() => setHideBalance(!hideBalance)}
            />
          </View>
          <View style={[styles.row, styles.marginTop16]}>
            <QuaiPayInputDisplay
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
            <Text style={textColor}>{input.unit}</Text>
            <ExchangeIcon
              color={isDarkMode ? styledColors.white : styledColors.black}
            />
          </TouchableOpacity>
        </View>
        {!amount ? (
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => inputRef.current?.focus()}
              style={[
                styles.editButton,
                {
                  borderColor: isDarkMode
                    ? styledColors.darkGray
                    : styledColors.border,
                },
              ]}
            >
              <FontAwesome
                name="pencil-square-o"
                size={24}
                color={isDarkMode ? styledColors.white : styledColors.dark}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToTip} style={styles.continueButton}>
              <Text
                style={{
                  color: styledColors.white,
                }}
              >
                {t('common.continue')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.row}>
            <View style={styles.buttons}>
              <TouchableOpacity
                onPress={goToTip}
                style={[
                  styles.tipButton,
                  {
                    borderColor: styledColors.gray,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      color: isDarkMode
                        ? styledColors.white
                        : styledColors.black,
                    },
                  ]}
                >
                  {t('home.send.includeTip')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={goToOverview}
                style={[styles.continueButton]}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      color: styledColors.white,
                    },
                  ]}
                >
                  {t('common.continue')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {!amount && (
        <View style={styles.keyboardContainer}>
          <QuaiPayKeyboard
            handleLeftButtonPress={keyboard.onDecimalButtonPress}
            handleRightButtonPress={keyboard.onDeleteButtonPress}
            onInputButtonPress={keyboard.onInputButtonPress}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  walletCardStyle: {
    marginTop: 80,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontWeight: '700',
  },
  continueButton: {
    borderRadius: 5,
    backgroundColor: styledColors.normal,
    alignSelf: 'center',
    paddingVertical: 16,
    width: '80%',
    alignItems: 'center',
    maxHeight: 48,
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
  editButton: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginLeft: 16,
    marginRight: 8,
    paddingVertical: 12,
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    maxHeight: 48,
    maxWidth: 48,
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
  username: {
    ...fontStyle.fontH3,
    marginTop: 8,
    fontSize: 14,
  },
  wallet: {
    ...fontStyle.fontSmallText,
  },
});

export default SendAmountScreen;
