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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';

import { fontStyle, styledColors } from 'src/styles';
import ExchangeIcon from 'src/shared/assets/exchange.svg';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';

import { useSendInput } from './hooks';
import { SendStackParamList } from './SendStack';
import { useNavigation } from '@react-navigation/native';

type SendAmountScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendAmount'
>;

// TODO: implement in-house keyboard
// TODO: improve L&F by using flex
const SendAmountScreen = ({}: SendAmountScreenProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const profilePicture = useProfilePicture();
  const username = useUsername();
  const wallet = useWallet();
  const inputRef = useRef<TextInput>(null);
  const { eqInput, input, onInputChange, onSwap } = useSendInput();

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
    console.log('Continue to Tip screen (TBD)');
    // @ts-ignore TODO: fix this after resolving the navigation issue
    navigation.navigate('SendTip', {
      amount: eqInput.unit === 'USD' ? eqInput.value : input.value,
      eqInput: eqInput,
    });
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
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: profilePicture }} />
          <Text style={[textColor, styles.username]}>To: {username}</Text>
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
            onPress={inputRef.current?.focus}
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
