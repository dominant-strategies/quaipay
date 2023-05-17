/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { storeItem } from '../../storage/keychain';
import { KeychainKeys } from '../../storage/constants';
import { buttonStyle, fontStyle, styledColors } from '../../theme/styles';
import { quais } from 'quais';

interface State {
  selectedImage: string | null;
}

interface State {
  selectedImage: string | null;
}

function SetupScreen() {
  const isDarkMode = (useColorScheme() === 'dark');
  const [userName, setUserName] = useState('');
  const [selectedImage, setSelectedImage] = useState<State['selectedImage']>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%', height: '100%',
  };

  const topViewStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    marginLeft: 10, marginRight: 10, marginTop: 'auto', marginBottom: 'auto',
  };

  useEffect(() => {
    const wallet = quais.Wallet.createRandom();
    console.log('Wallet: ', wallet);
  }, []);


  const saveUserName = useCallback(async (userName: string) => {
    try {
      await storeItem({ key: KeychainKeys.username, value: userName });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 300,
      },
      (response: ImagePickerResponse) => {
        if (!response.didCancel && !response.errorCode) {
          if (response.assets && response.assets[0]) {
            setSelectedImage(response.assets[0].uri === undefined ? null : response.assets[0].uri);
          } else {
            setSelectedImage(null);
          }
        }
      },
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={topViewStyle} >
        <View style={styles.welcomeTitleView}>
          <Text style={{ ...fontStyle.fontH1, ...styles.welcomeTitle, color: isDarkMode ? styledColors.white : styledColors.black }}>
            Choose a
          </Text>
          <Text style={{ ...fontStyle.fontH1, ...styles.welcomeTitle, color: isDarkMode ? styledColors.white : styledColors.black }}>
            username and
          </Text>
          <Text style={{ ...fontStyle.fontH1, ...styles.welcomeTitle, color: isDarkMode ? styledColors.white : styledColors.black }}>
            profile picture
          </Text>
        </View>
        <View style={{ width:'100%', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={pickImage}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: 200, height: 200, borderRadius:100, alignContent: 'center' }}
                />
              )}
              {!selectedImage &&  (
                <Image
                  source={require('./avatar.png')}
                  style={{ width: 200, height: 200, borderRadius:100, alignContent: 'center' }}
                />
              )}
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="User Name"
          textAlign="center"
          style={{ ...fontStyle.fontH2, marginTop: 20, textAlign: 'center', color: isDarkMode ? styledColors.white : styledColors.black }}
          value={userName}
          onChangeText={(text) => setUserName(text)}
          onSubmitEditing={() => {}}
          />
        <View style={styles.textDescriptionView}>
          <Text style={{ ...fontStyle.fontParagraph, ...styles.textDescription }}>
            Tap to edit
          </Text>
        </View>
        <View >
          <TouchableOpacity style={{ marginLeft: 21, marginRight: 21 }}
              onPress={() => {saveUserName(userName);}}
              >
            <Text style={{ ...fontStyle.fontH3, ...isDarkMode ? buttonStyle.white : buttonStyle.normal, borderRadius: 30 }}> Save </Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  welcomeTitleView: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  welcomeTitle: {
    verticalAlign: 'middle',
    textAlign: 'center',
    paddingHorizontal: 70,
  },
  textDescriptionView: {
    marginTop: 10,
  },
  textDescription: {
    color: '#B5B5B5',
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 100,
    lineHeight: 20,
  },
});

export default SetupScreen;
