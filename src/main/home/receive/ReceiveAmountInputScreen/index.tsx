import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { fontStyle, styledColors } from '../../../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReceiveStackParamList } from './ReceiveStack';
import SwitchSelector from 'react-native-switch-selector';
import ShareIcon from '../../../shared/assets/share.svg';
import ExchangeIcon from '../../../shared/assets/exchange.svg';
import ExchangeWhiteIcon from '../../../shared/assets/exchange_white.svg';

type ReceiveAmountInputProps = NativeStackScreenProps<
  ReceiveStackParamList,
  'ReceiveAmountInput'
>;

export const ReceiveAmountInputScreen = ({}: ReceiveAmountInputProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [sendPad, setSendPad] = useState<boolean>(true);
  const [amount, setAmount] = useState<string | null>('');
  const [unit, setUnit] = useState<string | null>('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
  };

  const topViewStyle = {
    marginLeft: 16,
    marginRight: 16,
  };

  const textColor = {
    color: isDarkMode ? styledColors.white : styledColors.black,
  };

  const onExchange = () => {
    console.log('onExchange');
    const result = unit === 'QUAI' ? 'USD' : 'QUAI';
    setUnit(result);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={topViewStyle}>
        <View style={styles.switchStyle}>
          <SwitchSelector
            initial={0}
            onPress={(value: boolean | ((prevState: boolean) => boolean)) =>
              setSendPad(value)
            }
            textColor={isDarkMode ? styledColors.white : styledColors.black}
            selectedColor={styledColors.black}
            buttonColor={styledColors.white}
            borderColor={styledColors.gray}
            backgroundColor={
              !isDarkMode ? styledColors.lightGray : styledColors.black
            }
            textStyle={fontStyle.fontParagraph}
            selectedTextStyle={fontStyle.fontParagraph}
            hasPadding
            buttonMargin={2}
            options={[
              { label: 'Receive', value: 'r', imageIcon: undefined },
              { label: 'Send', value: 's', imageIcon: undefined },
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          />
        </View>
        {sendPad ? (
          <>
            <View
              style={{
                ...styles.walletCardStyle,
                backgroundColor: isDarkMode
                  ? styledColors.dark
                  : styledColors.white,
                borderColor: isDarkMode
                  ? styledColors.darkGray
                  : styledColors.lightGray,
              }}
            >
              <Text
                style={[
                  styles.amountunit,
                  {
                    color: isDarkMode ? styledColors.gray : styledColors.black,
                  },
                ]}
              >
                ${amount} {unit}
              </Text>
              <Text style={[styles.xunit, textColor]}>XXX.XXX {unit}</Text>
              <TouchableOpacity
                onPress={() => {
                  onExchange();
                }}
                style={[styles.exchangeUnit]}
              >
                <Text style={[textColor]}>{unit}</Text>
                {isDarkMode ? (
                  <ExchangeWhiteIcon width={14} height={11} />
                ) : (
                  <ExchangeIcon width={14} height={11} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.buttonAreaInfo}>
              <TouchableOpacity onPress={() => {}} style={styles.requestView}>
                <Text style={styles.shareTxt}>Share</Text>
                <ShareIcon width={12} height={16.18} />
              </TouchableOpacity>
            </View>

            <View style={styles.learnMoreAreaInfo}>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  style={{
                    ...fontStyle.fontSmallText,
                    ...styles.learnMoreText,
                  }}
                >
                  Learn more about QuaiPay
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  switchStyle: {
    marginTop: 40,
  },
  walletCardStyle: {
    marginTop: 66,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: styledColors.lightGray,
    height: 426,
  },
  walletView: {
    marginTop: 16.5,
  },
  buttonAreaInfo: {
    marginTop: 15,
  },
  learnMoreAreaInfo: {
    marginTop: 15,
  },
  learnMoreText: {
    color: styledColors.gray,
    textDecorationLine: 'underline',
  },
  requestView: {
    backgroundColor: '#0066FF',
    height: 42,
    borderRadius: 8,
    verticalAlign: 'middle',
    color: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  shareTxt: {
    color: '#fff',
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
  amountunit: { textAlign: 'center', marginTop: 35 },
  xunit: { textAlign: 'center', marginTop: 5, fontSize: 24, color: '#000' },
});
