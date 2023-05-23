/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import { buttonStyle, fontStyle, styledColors } from '../../theme/styles';
import { storeItem } from '../../storage/keychain';
import { formatDiagnostic } from 'typescript';
// import Icon from 'react-native-vector-icons/FontAwesome';

const { RNRandomBytes } = NativeModules;

function RequestFlow() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  const backgroundImage = {
    backgroundColor: isDarkMode ? styledColors.normalGray: styledColors.black,
  };

  const topViewStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  const textColor = {
    color: isDarkMode ? styledColors.white : styledColors.black,
  };

  const [email, setEmail] = useState('');
  //   const [qrcode, setQrcode] = useState('');
  const [phrase, setPhrase] = useState('');
  const [nfcCard, setNfcCard] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('');
  const [amount, setAmount] = useState('25.34');
  const [expandedIndex, setExpandedIndex] = useState(1);
  const setToggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(0);
    } else {
      setExpandedIndex(index);
    }
  };

  const onBack = () => {
    console.log(20230522, `onBack`);
  };

  const onContinue = () => {
    console.log(20230522, `onContinue`);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 48,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            onBack();
          }}
        >
          <Image source={require('./left_arrow.png')} />
        </TouchableOpacity>
        <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <Text style={[textColor, { fontSize: 24, fontWeight: '700' }]}>
            {' '}
            Request
          </Text>
        </View>
        <Text> </Text>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 97,
        }}
      >
        {/* <Image
          source={require('./avatar.png')}
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            alignContent: 'center',
          }}
        /> */}
        <View
          style={[backgroundImage, { width: 60, height: 60, borderRadius: 60 }]}
        ></View>
        <Text style={[textColor, { marginTop: 8 }]}>Alan Orwick</Text>
        <Text style={textColor}>0x123453.....0934823</Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 5,
            borderColor: '#0066FF',
            borderRadius: 2,
          }}
        >
          <Text
            style={[
              textColor,
              {
                ...fontStyle.fontH,
                textAlign: 'right',
                fontSize: 26,
                height: 70,
                marginTop: 10,
              },
            ]}
          >
            $
          </Text>
          <TextInput
            style={[
              textColor,
              {
                marginTop: 8,
                fontSize: 48,
                height: 80,
                width: 140,
                textAlign: 'center',
              },
            ]}
            placeholder="Type here to translate!"
            onChangeText={newText => setAmount(newText)}
            defaultValue={amount}
          />
          <Text
            style={{
              ...fontStyle.fontH,
              textAlign: 'left',
              color: '#808080',
              marginTop: 8,
              height: 80,
              fontSize: 48,
              verticalAlign: 'middle',
            }}
          >
            USD
          </Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <Text style={[textColor, { textAlign: 'right', fontSize: 14 }]}>
            XXX.XXXXX QUAI{' '}
          </Text>
          <Image
            source={
              isDarkMode
                ? require('./exchange_white.png')
                : require('./exchange.png')
            }
            style={{
              width: 90,
              height: 24,
              borderRadius: 100,
              alignContent: 'center',
            }}
          />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 44, gap: 8 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#D5D5D5',
            }}
          >
            <Image
              source={
                isDarkMode ? require('./pen_white.png') : require('./pen.png')
              }
              style={{
                borderRadius: 100,
                alignContent: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#0066FF',
              width: 275,
              height: 42,
              borderRadius: 8,
            }}
            onPress={() => {
              onContinue();
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  currency: {
    fontSize: 12, // Adjust the font size as needed
    position: 'relative',
    top: -4, // Adjust the top position as needed
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  description: {
    color: '#808080',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  panel: {
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 45,
    shadowColor: '#D0D0D0',
    marginBottom: 10,
    marginLeft: 11,
    marginRight: 11,
  },
  accordionTitle: {
    color: '#D4D4D4',
    verticalAlign: 'middle',
    textAlign: 'left',
    padding: 10,
    marginLeft: 10,
    marginRight: 15,
  },
  textInput: {
    color: '#808080',
    borderWidth: 2,
    borderColor: '#0062C8',
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
  },
});

export default RequestFlow;
