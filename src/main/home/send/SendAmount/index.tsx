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
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { SendStackParamList } from '../SendStack';
import { fontStyle, styledColors } from 'src/shared/styles';
import { useSendInput } from './hooks';
import { useWallet } from 'src/shared/hooks';
import { getBalance } from 'src/shared/services/quais';
import { EUnit } from './types';

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
  const [quaiBalance, setQuaiBalance] = React.useState(0);
  const [hideBalance, setHideBalance] = React.useState(false);
  const inputRef = useRef<TextInput>(null);
  const { eqInput, input, onInputChange, onSwap } = useSendInput(
    amount ? `${amount}` : '0',
  );

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
    // @ts-ignore
    navigation.navigate('SendStack', {
      screen: 'SendTip',
      params: {
        amount: input.unit === EUnit.USD ? input.value : eqInput.value,
        eqInput: eqInput,
        input: input,
        address,
        username,
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
            {`${address.slice(0, 8)}...${address?.slice(-8)}`}
          </Text>
        </View>
        <View>
          <View style={styles.balanceContainer}>
            <Text
              style={{
                color: styledColors.gray,
              }}
            >
              {t('home.send.yourBalance')}${hideBalance ? 'X.XX' : quaiBalance}
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
            <Text style={[styles.xUnit]}>{` ${input.unit}`}</Text>
          </View>
          <View style={styles.inputBorder} />
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
          <TouchableOpacity onPress={goToTip} style={[styles.continueButton]}>
            <Text
              style={{
                color: styledColors.white,
              }}
            >
              {t('common.continue')}
            </Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 48,
    fontWeight: '700',
    color: styledColors.gray,
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
  continueButton: {
    borderRadius: 8,
    backgroundColor: styledColors.normal,
    marginTop: 44,
    alignSelf: 'center',
    marginRight: 16,
    marginLeft: 4,
    paddingVertical: 16,
    flex: 1,
    alignItems: 'center',
    maxHeight: 48,
  },
  editButton: {
    borderRadius: 8,
    backgroundColor: 'transparent',
    marginTop: 44,
    alignSelf: 'center',
    marginLeft: 16,
    marginRight: 4,
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
