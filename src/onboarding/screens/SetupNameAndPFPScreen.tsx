/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import { styledColors } from 'src/shared/styles';
import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { useTranslation } from 'react-i18next';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { useTheme } from 'src/shared/context/themeContext';

interface State {
  selectedImage: string;
}

type SetupNameAndPFPScreenProps = {
  navigation: any;
};

const PFPURLPlaceholder =
  'https://www.pngfind.com/pngs/m/616-6168267_personblack-jack-kicking-at-camera-jack-black-transparent.png';

function SetupNameAndPFPScreen({ navigation }: SetupNameAndPFPScreenProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] =
    useState<State['selectedImage']>(PFPURLPlaceholder);
  const styles = useThemedStyle(themedStyle);
  const { theme } = useTheme();

  const saveUserName = useCallback(async () => {
    try {
      // TODO: show error banner when no username provided
      await storeItem({ key: keychainKeys.username, value: username });
      // TODO: add default PFP options
      await storeItem({
        key: keychainKeys.profilePicture,
        value: profilePicture,
      });
      navigation.navigate('SetupLocation');
    } catch (error) {
      console.log(error);
    }
  }, [username, profilePicture]);

  return (
    <DismissKeyboard>
      <QuaiPayContent hasBackgroundVariant>
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior="padding"
          enabled
          keyboardVerticalOffset={0}
        >
          <ScrollView>
            <View style={styles.title}>
              <QuaiPayText type="H1">
                {t('onboarding.setup.nameAndPFP.choose')}
              </QuaiPayText>
            </View>
            <View style={styles.body}>
              <View style={styles.imageCenterer}>
                <View style={styles.imageNormalBorder}>
                  <View style={styles.imageSurfaceBorder}>
                    <Image
                      source={{
                        uri: profilePicture,
                      }}
                      style={styles.image}
                    />
                  </View>
                </View>
              </View>
              <QuaiPayText type="H3">
                {t('onboarding.setup.nameAndPFP.username')}
              </QuaiPayText>
              <TextInput
                style={styles.textInput}
                onChangeText={setUsername}
                placeholder={
                  t('onboarding.setup.nameAndPFP.username') as string
                }
                placeholderTextColor={theme.secondary}
                value={username}
              />
              <QuaiPayText type="H3">
                {t('onboarding.setup.nameAndPFP.PFPURL')}
              </QuaiPayText>
              <TextInput
                style={styles.textInput}
                onChangeText={setProfilePicture}
                placeholder={PFPURLPlaceholder}
                placeholderTextColor={theme.secondary}
                value={profilePicture}
              />
              <QuaiPayText>
                To reduce dependencies here we allow users to upload a custom
                weblink for their profile picture. Cycle through default profile
                picture options.
              </QuaiPayText>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    saveUserName();
                  }}
                >
                  <Text style={styles.buttonText}>{t('common.continue')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </QuaiPayContent>
    </DismissKeyboard>
  );
}
const DismissKeyboard = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    body: {
      alignItems: 'flex-start',
      paddingHorizontal: 16,
    },
    button: {
      borderRadius: 8,
      marginVertical: 22,
      backgroundColor: styledColors.normal,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 42,
    },
    buttonText: {
      color: styledColors.white,
      fontWeight: '700',
    },
    imageCenterer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 16,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    imageSurfaceBorder: {
      borderRadius: 44,
      borderWidth: 4,
      borderColor: theme.surface,
    },
    imageNormalBorder: {
      borderRadius: 48,
      borderWidth: 4,
      borderColor: styledColors.normal,
    },
    keyboardAvoiding: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      alignItems: 'center',
      marginBottom: 25,
      marginTop: 25,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    textInput: {
      borderRadius: 4,
      borderWidth: 2,
      marginBottom: 16,
      marginTop: 8,
      paddingHorizontal: 13,
      height: 32,
      color: theme.primary,
      borderColor: theme.border,
      width: '100%',
    },
  });

export default SetupNameAndPFPScreen;
