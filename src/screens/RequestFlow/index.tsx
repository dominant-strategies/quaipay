import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import { fontStyle, styledColors } from '../../theme/styles';
import ExchangeIcon from '../../../assets/icons/exchange.svg';
import PenIcon from '../../../assets/icons/pen.svg';
import LeftArrow from '../../../assets/icons/left_arrow.svg';
function RequestFlow() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  const backgroundImage = {
    backgroundColor: isDarkMode ? styledColors.normalGray : styledColors.black,
  };

  const textColor = {
    color: isDarkMode ? styledColors.white : styledColors.black,
  };

  const [amount, setAmount] = useState('25.34');
  const [unit, setUnit] = useState('QUAI');

  const onBack = () => {
    console.log('onBack');
  };

  const onExchange = () => {
    console.log('onExchange');
    const result = unit === 'QUAI' ? 'USD' : 'QUAI';
    setUnit(result);
  };

  const onContinue = () => {
    console.log('onContinue');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.viewStyle}>
        <TouchableOpacity
          onPress={() => {
            onBack();
          }}
        >
          <LeftArrow />
        </TouchableOpacity>
        <View style={styles.alignCenter}>
          <Text style={[{ ...fontStyle.fontH }, textColor, styles.topRequest]}>
            {'R\u200Ae\u200Aq\u200Au\u200Ae\u200As\u200At'}
          </Text>
        </View>
        <Text> </Text>
      </View>

      <View style={styles.mainView}>
        <View style={[backgroundImage, styles.avatar]} />
        <Text style={[textColor, styles.name]}>Alan Orwick</Text>
        <Text style={textColor}>0x123453.....0934823</Text>
        <View style={styles.flexRow}>
          <Text
            style={[
              textColor,
              {
                ...fontStyle.fontH,
              },
              styles.dollarSign,
            ]}
          >
            $
          </Text>
          <TextInput
            style={[
              textColor,
              styles.amount,
              {
                ...fontStyle.fontH,
              },
            ]}
            onChangeText={newText => setAmount(newText)}
            defaultValue={amount}
          />
          <Text
            style={[
              styles.usd,
              {
                ...fontStyle.fontH,
              },
            ]}
          >
            USD
          </Text>
        </View>
        <View style={styles.quai} />
        <View style={styles.quaiView}>
          <Text style={[textColor, styles.xxxquai]}>XXX.XXXXX {unit} </Text>
          <TouchableOpacity
            onPress={() => {
              onExchange();
            }}
            style={styles.exchangeUnit}
          >
            <Text style={textColor}>
              {unit}</Text>
              <ExchangeIcon width={14} height={11} />
          </TouchableOpacity>
        </View>

        <View style={styles.penView}>
          <View style={styles.pen}>
            <PenIcon style={styles.penImage} width={18.75} height={18.75} />
          </View>
          <TouchableOpacity
            style={styles.continueView}
            onPress={() => {
              onContinue();
            }}
          >
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  alignCenter: { marginLeft: 'auto', marginRight: 'auto' },
  topRequest: { fontSize: 24, fontWeight: '700' },
  mainView: {
    width: '100%',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 97,
  },
  avatar: { width: 60, height: 60, borderRadius: 60 },
  name: { marginTop: 8 },
  flexRow: {
    flexDirection: 'row',
  },
  penView: { flexDirection: 'row', marginTop: 44, gap: 8 },
  dollarSign: { textAlign: 'right', fontSize: 26, height: 70, marginTop: 10 },
  amount: {
    marginTop: 8,
    fontSize: 48,
    height: 80,
    width: 140,
    textAlign: 'center',
  },
  usd: {
    textAlign: 'left',
    color: '#808080',
    marginTop: 8,
    height: 80,
    fontSize: 48,
    verticalAlign: 'middle',
  },
  quai: {
    width: '70%',
    backgroundColor: '#0066FF',
    marginTop: -14,
    height: 5,
    borderRadius: 5,
  },
  quaiView: { flexDirection: 'row', marginTop: 30 },
  xxxquai: { textAlign: 'right', fontSize: 14 },
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

  },
  pen: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D5D5D5',
  },
  penImage: {
    borderRadius: 100,
    alignContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  continueView: {
    backgroundColor: '#0066FF',
    width: 275,
    height: 42,
    borderRadius: 8,
  },
  continueText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default RequestFlow;
