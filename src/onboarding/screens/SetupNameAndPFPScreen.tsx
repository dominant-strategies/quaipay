import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import makeBlockie from 'ethereum-blockies-base64';

import PersonOutlineIcon from 'src/shared/assets/personOutline.svg';
import RefreshIcon from 'src/shared/assets/refresh.svg';
import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import {
  QuaiPayAvatar,
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayText,
} from 'src/shared/components';
import { MIN_HEIGHT_CONTENT_HEADER } from 'src/shared/components/QuaiPayContent';
import {
  useProfilePicture,
  useThemedStyle,
  useWalletObject,
} from 'src/shared/hooks';
import { Theme, Zone } from 'src/shared/types';
import { useTheme } from 'src/shared/context/themeContext';

import { OnboardingStackScreenProps } from '../OnboardingStack';

const PFPURLPlaceholder =
  'https://www.pngfind.com/pngs/m/616-6168267_personblack-jack-kicking-at-camera-jack-black-transparent.png';
const indexedZones = Object.values(Zone);

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
  const insets = useSafeAreaInsets();
  const walletObject = useWalletObject();
  const profilePicture = useProfilePicture();
  const [currentWalletIndex, setCurrentWalletIndex] = useState(0);

  const walletBlockie = walletObject?.[indexedZones[currentWalletIndex]]
    ?.address
    ? makeBlockie(walletObject?.[indexedZones[currentWalletIndex]]?.address)
    : PFPURLPlaceholder; // If anything fails, show placeholder

  const onRefreshButton = () =>
    setCurrentWalletIndex(prevState =>
      prevState + 1 < indexedZones.length ? prevState + 1 : 0,
    );

  const saveUserName = useCallback(async () => {
    try {
      await storeItem({ key: keychainKeys.username, value: username });
      if (!profilePicture) {
        await storeItem({
          key: keychainKeys.profilePicture,
          value: indexedZones[currentWalletIndex],
        });
      }
      navigation.navigate('SetupLocation');
    } catch (error) {
      console.log(error);
    }
  }, [username]);

  return (
    <QuaiPayContent containerStyle={styles.mainContainer}>
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
        <QuaiPayAvatar
          profilePicture={profilePicture ? profilePicture : walletBlockie}
          bottomRightIcon={profilePicture ? undefined : <RefreshIcon />}
          onBottomRightIconPress={onRefreshButton}
        />
        <View style={styles.separator} />
        <View style={styles.row}>
          <PersonOutlineIcon />
          <TextInput
            autoFocus
            style={styles.textInput}
            onChangeText={setUsername}
            placeholder={t('usernamePlaceholder') as string}
            placeholderTextColor={theme.secondary}
            value={username}
          />
        </View>
        <View style={styles.baseline} />
        <View style={styles.doubleSeparator} />
        <QuaiPayButton
          disabled={!username}
          title={tCommon('continue')}
          onPress={saveUserName}
          style={{
            ...styles.continueButton,
            marginBottom:
              styles.continueButton.marginBottom + insets.bottom ?? 0,
          }}
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
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
    continueButton: {
      marginBottom: 32,
    },
    separator: {
      flex: 1,
    },
    doubleSeparator: {
      flex: 2,
    },
  });
