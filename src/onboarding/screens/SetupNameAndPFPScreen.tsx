/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
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
import { storeItem } from '../../shared/services/keychain';
import { keychainKeys } from '../../shared/constants/keychainKeys';
import { buttonStyle, fontStyle, styledColors } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface State {
  selectedImage: string;
}

type SetupNameAndPFPScreenProps = {
  navigation: any;
};
function SetupNameAndPFPScreen({ navigation }: SetupNameAndPFPScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState<State['selectedImage']>(
    'https://www.pngfind.com/pngs/m/616-6168267_personblack-jack-kicking-at-camera-jack-black-transparent.png',
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  const topViewStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  };

  const saveUserName = useCallback(async () => {
    try {
      await storeItem({ key: keychainKeys.username, value: username });
      await storeItem({
        key: keychainKeys.profilePicture,
        value: selectedImage,
      });
      console.log('username', username);
      console.log('profilePicture', selectedImage);
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('profilePicture', selectedImage);
      navigation.navigate('SetupLocation');
    } catch (error) {
      console.log(error);
    }
  }, [username, selectedImage]);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 300,
        maxWidth: 300,
      },
      (response: ImagePickerResponse) => {
        if (!response.didCancel && !response.errorCode) {
          if (response.assets && response.assets[0]) {
            setSelectedImage(
              `data:${response.assets[0].type};base64,${response.assets[0].base64}}`,
            );
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
      <View style={topViewStyle}>
        <View style={styles.welcomeTitleView}>
          <Text
            style={{
              ...fontStyle.fontH1,
              ...styles.welcomeTitle,
              color: isDarkMode ? styledColors.white : styledColors.black,
            }}
          >
            Choose a{'\n'}username and{'\n'}profile picture
          </Text>
        </View>
        <TouchableOpacity onPress={pickImage} style={styles.buttonStyle}>
          <Image
            source={{
              uri: selectedImage,
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              alignContent: 'center',
            }}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="User Name"
          textAlign="center"
          style={{
            ...fontStyle.fontH2,
            marginTop: 20,
            textAlign: 'center',
            color: isDarkMode ? styledColors.white : styledColors.black,
          }}
          value={username}
          onChangeText={text => setUsername(text)}
          onSubmitEditing={() => {}}
        />
        <View style={styles.textDescriptionView}>
          <Text
            style={{ ...fontStyle.fontParagraph, ...styles.textDescription }}
          >
            Tap to edit
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{ marginLeft: 21, marginRight: 21 }}
            onPress={() => {
              saveUserName();
            }}
          >
            <Text
              style={{
                ...fontStyle.fontH3,
                ...(isDarkMode ? buttonStyle.white : buttonStyle.normal),
                borderRadius: 30,
              }}
            >
              {' '}
              Save{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
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

export default SetupNameAndPFPScreen;
