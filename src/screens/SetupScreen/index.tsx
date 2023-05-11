/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import type {PropsWithChildren} from 'react';
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
import { Colors, } from 'react-native/Libraries/NewAppScreen';

import { quais } from "quais";

interface State {
  selectedImage: string | null;
}

type TextDescriptionProps = PropsWithChildren<{
  
}>;

function TextDescription({children}: TextDescriptionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {  };

  return (
    <View style={styles.textDescriptionView}>
      <Text style={styles.textDescription}>
        {children}
      </Text>
    </View>
  );
}

interface State {
  selectedImage: string | null;
}

function SetupScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [userName, setUserName] = useState("");
  const [selectedImage, setSelectedImage] = useState<State['selectedImage']>(null);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto',
    alignItem: 'center'
  };
  
  useEffect(() => {
    const wallet = quais.Wallet.createRandom();
    console.log("Wallet: ", wallet);
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
          if (response.assets && response.assets[0])
            setSelectedImage(response.assets[0].uri == undefined ? null : response.assets[0].uri);
          else
            setSelectedImage(null);

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
      <View style={backgroundStyle}>
        <View style={{ width:'100%', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto'}}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={pickImage}>
              {selectedImage && (
                <Image 
                  source={{ uri: selectedImage }}
                  style={{width: 200, height: 200, borderRadius:100, alignContent: 'center'}}
                />
              )}
              {!selectedImage &&  (
                <Image 
                  source={require('./avatar.png')}
                  style={{width: 200, height: 200, borderRadius:100, alignContent: 'center'}}
                />
              )}
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="User Name"
          textAlign='center'
          style={{marginTop:20}}
          value={userName}
          onChangeText={(text) => setUserName(text)}
          onSubmitEditing={() => {}}
          />
        <TextDescription>
          Choose a Username and Profile Picture.
        </TextDescription>
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
    borderRadius: 100
  },
  textDescriptionView: {
    marginTop: 10,
  }, 
  textDescription: {
    color: Colors.light,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 100,
    lineHeight: 20
  }
});

export default SetupScreen;
