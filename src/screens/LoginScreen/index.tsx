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
// import Icon from 'react-native-vector-icons/FontAwesome';

const { RNRandomBytes } = NativeModules;

function LoginScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  const topViewStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  const textColor = isDarkMode ? styledColors.white : styledColors.black;

  const [email, setEmail] = useState('');
  //   const [qrcode, setQrcode] = useState('');
  const [phrase, setPhrase] = useState('');
  const [nfcCard, setNfcCard] = useState('');
  const [deviceInfo, setDeviceInfo] = useState('');

  const [expandedIndex, setExpandedIndex] = useState(1);
  const setToggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(0);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={topViewStyle}>
        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            paddingTop: 85,
            paddingBottom: 60,
          }}
        >
          <Text
            style={{ ...fontStyle.fontH1, ...styles.title, color: textColor }}
          >
            Login to QuaiPay
          </Text>
          <Text style={{ ...fontStyle.fontH3, ...styles.description }}>
            Complete two to sign in.
          </Text>
          {/* <Slider
            style={{ width: '100%', height: 40 }}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#307ecc"
            maximumTrackTintColor="#000000"
            step={1}
            value={5}
            /> */}
          <View style={styles.panel}>
            <TouchableOpacity
              onPress={() => {
                setToggleExpand(1);
              }}
            >
              <Text
                style={{
                  ...fontStyle.fontH3,
                  ...styles.accordionTitle,
                  color: expandedIndex === 1 ? textColor : '#808080',
                }}
              >
                {/* <Icon
                        name="checkmark-circle"
                        size={24}
                        color="gray"
                        style={{ paddingRight: 30, marginRight: 30 }}
                        /> */}
                1. Email
              </Text>
            </TouchableOpacity>
            {expandedIndex === 1 && (
              <>
                <TextInput
                  placeholder="Enter Email Address"
                  textAlign="left"
                  style={{
                    ...styles.textInput,
                    backgroundColor: isDarkMode ? '#282828' : '#EFEFEF',
                  }}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
              </>
            )}
          </View>
          <View style={styles.panel}>
            <TouchableOpacity
              onPress={() => {
                setToggleExpand(2);
              }}
            >
              <Text
                style={{
                  ...fontStyle.fontH3,
                  ...styles.accordionTitle,
                  color: expandedIndex === 2 ? textColor : '#808080',
                }}
              >
                {/* <Icon
                        name="checkmark-circle"
                        size={24}
                        color="gray"
                        style={{ paddingHorizontal: 30 }}
                        /> */}
                2. QR Code
              </Text>
            </TouchableOpacity>
            {expandedIndex === 2 && (
              <>
                <View
                  style={{ height: 200, backgroundColor: styledColors.black }}
                >
                  <Image
                    source={require('./Camera.png')}
                    style={{
                      marginTop: 'auto',
                      marginBottom: 'auto',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  />
                </View>
              </>
            )}
          </View>
          <View style={styles.panel}>
            <TouchableOpacity
              onPress={() => {
                setToggleExpand(3);
              }}
            >
              <Text
                style={{
                  ...fontStyle.fontH3,
                  ...styles.accordionTitle,
                  color: expandedIndex === 3 ? textColor : '#808080',
                }}
              >
                {/* <Icon
                        name="checkmark-circle"
                        size={24}
                        color="gray"
                        style={{ paddingHorizontal: 30 }}
                        /> */}
                3. Written Phrase
              </Text>
            </TouchableOpacity>
            {expandedIndex === 3 && (
              <>
                <TextInput
                  placeholder="Enter Phrase String"
                  textAlign="left"
                  style={{
                    ...styles.textInput,
                    backgroundColor: isDarkMode ? '#282828' : '#0062C8',
                  }}
                  value={phrase}
                  onChangeText={text => setPhrase(text)}
                />
              </>
            )}
          </View>
          <View style={styles.panel}>
            <TouchableOpacity
              onPress={() => {
                setToggleExpand(4);
              }}
            >
              <Text
                style={{
                  ...fontStyle.fontH3,
                  ...styles.accordionTitle,
                  color: expandedIndex === 4 ? textColor : '#808080',
                }}
              >
                {/* <Icon
                        name="checkmark-circle"
                        size={24}
                        color="gray"
                        style={{ paddingHorizontal: 30 }}
                        /> */}
                4. NFC Card
              </Text>
            </TouchableOpacity>
            {expandedIndex === 4 && (
              <>
                <TextInput
                  placeholder="Enter NFC Card"
                  textAlign="left"
                  style={{
                    ...styles.textInput,
                    backgroundColor: isDarkMode ? '#282828' : '#0062C8',
                  }}
                  value={nfcCard}
                  onChangeText={text => setNfcCard(text)}
                />
              </>
            )}
          </View>
          <View style={styles.panel}>
            <TouchableOpacity
              onPress={() => {
                setToggleExpand(5);
              }}
            >
              <Text
                style={{
                  ...fontStyle.fontH3,
                  ...styles.accordionTitle,
                  color: expandedIndex === 5 ? textColor : '#808080',
                }}
              >
                {/* <Icon
                            name="checkmark-circle"
                            size={24}
                            color="gray"
                            style={{ paddingHorizontal: 30 }}
                            /> */}
                5. Set up from other device
              </Text>
            </TouchableOpacity>
            {expandedIndex === 5 && (
              <>
                <TextInput
                  placeholder="Enter Device Info"
                  textAlign="left"
                  style={{
                    ...styles.textInput,
                    backgroundColor: isDarkMode ? '#282828' : '#0062C8',
                  }}
                  value={deviceInfo}
                  onChangeText={text => setDeviceInfo(text)}
                />
              </>
            )}
          </View>
          <Text
            style={{
              ...fontStyle.fontSmallText,
              textDecorationLine: 'underline',
              textAlign: 'center',
            }}
          >
            Learn more about account recovery
          </Text>
        </View>
        <View style={{ width: '100%', position: 'absolute', bottom: 60 }}>
          <TouchableOpacity
            style={{ marginLeft: 21, marginRight: 21 }}
            onPress={() => {
              // TODO: Promisify when we add node-libs-react-native
              RNRandomBytes.randomBytes(32, (err: any, bytes: string) => {
                if (err) {
                  console.log(err);
                } else {
                  storeItem({ key: 'entropy', value: bytes })
                    .then(console.log)
                    .catch(console.log);
                }
              });
            }}
          >
            <View style={{ backgroundColor: '#0062C8', borderRadius: 30 }}>
              <Text
                style={{
                  ...fontStyle.fontH3,
                  ...(isDarkMode ? buttonStyle.white : buttonStyle.normal),
                  borderRadius: 8,
                }}
              >
                {' '}
                Continue{' '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
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

export default LoginScreen;
