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

type SendTipScreenProps = NativeStackScreenProps<SendStackParamList, 'SendTip'>;

const SendTipScreen = ({ route }: SendTipScreenProps) => {
  const { amount, address, username, eqInput, input } = route.params;
  console.log('amount', amount);
  console.log(route.params);
  const { t } = useTranslation();
  const navigation = useNavigation();
  console.log('navigation', navigation);
  const isDarkMode = useColorScheme() === 'dark';

  const [selectedTip, setSelectedTip] = useState<any>(null);
  const [customTip, setCustomTip] = useState('');

  const handleTipPress = (tipPercentage: any) => {
    if (tipPercentage === 'custom') {
      setSelectedTip(selectedTip === 'custom' ? null : 'custom');
    } else {
      setSelectedTip(tipPercentage);
    }
    console.log(`Selected tip: ${tipPercentage}`);
  };

  const calculateTipAmount = (_amount: number, tipPercentage: number) => {
    if (tipPercentage === 0) {
      return t('home.send.noTip');
    }
    const tipAmount = (_amount * tipPercentage) / 100;
    return `$${tipAmount.toFixed(2)} ${t('home.send.tip')}`;
  };

  const isButtonSelected = (tipPercentage: any) => {
    return selectedTip === tipPercentage;
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
          {/* <Image style={styles.image} source={{ uri: profilePicture }} /> */}
          <Text style={[textColor, styles.username]}>
            {t('common:to')} {username}
          </Text>
          <Text style={[lightTextColor, styles.wallet]}>
            {`${address.slice(0, 8)}...${address?.slice(-8)}`}
          </Text>
        </View>
        <Text style={[textColor, styles.tipText]}>
          {t('home.send.includeTip')}
        </Text>
        <View style={styles.balanceContainer}>
          <Text style={[fontStyle.fontH1, textColor]}>${amount}</Text>
          <Text style={[fontStyle.fontH1, lightTextColor]}>
            {input.unit === 'USD' ? ` ${input.unit}` : ` ${eqInput.unit}`}
          </Text>
        </View>
        <Text style={[textColor, fontStyle.fontParagraph]}>
          {`$${amount} + `}
          {selectedTip === 'custom'
            ? `$${customTip} ${t('home.send.tip')}`
            : `${calculateTipAmount(Number(amount), Number(selectedTip))}`}
        </Text>
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
              15% (${calculateTipAmount(amount, 15)})
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
              20% (${calculateTipAmount(amount, 20)})
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
              25% (${calculateTipAmount(amount, 25)})
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
