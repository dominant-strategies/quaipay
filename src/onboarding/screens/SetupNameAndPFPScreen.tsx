import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import {
  QuaiPayAvatar,
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayText,
} from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { useTheme } from 'src/shared/context/themeContext';
import { MIN_HEIGHT_CONTENT_HEADER } from 'src/shared/components/QuaiPayContent';

import { OnboardingStackScreenProps } from '../OnboardingStack';

const PFPURLPlaceholder =
  'https://www.pngfind.com/pngs/m/616-6168267_personblack-jack-kicking-at-camera-jack-black-transparent.png';

export const SetupNameAndPFPScreen: React.FC<
  OnboardingStackScreenProps<'SetupNameAndPFP'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.setup.nameAndPFP',
  });
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const [username, setUsername] = useState('');
  const styles = useThemedStyle(themedStyle);
  const { theme } = useTheme();

  const saveUserName = useCallback(async () => {
    try {
      // TODO: show error banner when no username provided
      await storeItem({ key: keychainKeys.username, value: username });
      navigation.navigate('SetupLocation');
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  return (
    <QuaiPayContent hasBackgroundVariant containerStyle={styles.mainContainer}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
        keyboardVerticalOffset={MIN_HEIGHT_CONTENT_HEADER}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
        <View style={styles.separator} />
        <QuaiPayText type="H1" style={styles.title}>
          {t('title')}
        </QuaiPayText>
        <View style={styles.separator} />
              <QuaiPayAvatar profilePicture={PFPURLPlaceholder} />
        <View style={styles.separator} />
              <TextInput
                autoFocus
                style={styles.textInput}
                onChangeText={setUsername}
                placeholder={t('usernamePlaceholder') as string}
                placeholderTextColor={theme.secondary}
                value={username}
              />
        <View style={styles.baseline} />
        <View style={styles.doubleSeparator} />
              <QuaiPayButton
                title={tCommon('continue')}
                onPress={saveUserName}
              />
        </KeyboardAvoidingView>
      </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      paddingHorizontal: 16,
    },
    keyboardAvoiding: {
      flex: 1,
    },
    title: {
      paddingHorizontal: 40,
    },
    textInput: {
      height: 40,
      color: theme.primary,
    },
    baseline: {
      borderBottomWidth: 2,
      borderColor: theme.normal,
      width: '100%',
      marginBottom: 8,
    },
  });
