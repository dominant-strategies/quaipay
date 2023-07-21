import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  QuaiPayAvatar,
  QuaiPayButton,
  QuaiPayLoader,
  QuaiPaySettingsContent,
  QuaiPayText,
} from 'src/shared/components';
import { useTranslation } from 'react-i18next';
import {
  useProfilePicture,
  useThemedStyle,
  useUsername,
} from 'src/shared/hooks';
import { Theme, Zone } from 'src/shared/types';
import Link from 'src/shared/assets/link.svg';
import { useWalletContext } from 'src/shared/context/walletContext';

export const AccountDetails = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.details',
  });
  const styles = useThemedStyle(themedStyle);

  const username = useUsername();
  const profilePictureImg = useProfilePicture();
  const { profilePicture, setUsername, setProfilePicture } = useWalletContext();

  const [loading, setLoading] = useState(false);
  const [usernameInput, setUsernameInput] = useState(username);
  const [profilePictureInput, setProfilePictureInput] = useState(
    Zone[profilePicture as keyof typeof Zone] ? '' : profilePicture, // check if it's blockie or not
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('USD');
  const [items, setItems] = useState([
    { label: 'USD - United States Dollar', value: 'USD' },
  ]);

  const handleSave = useCallback(async () => {
    setLoading(true);
    await setUsername(usernameInput ? usernameInput : username ?? '');
    await setProfilePicture(
      profilePictureInput ? profilePictureInput : 'zone-0-0',
    );
    setLoading(false);
  }, [usernameInput, profilePictureInput]);

  if (!profilePictureImg || !username || loading) {
    return <QuaiPayLoader text={t('loading')} />;
  }

  return (
    <QuaiPaySettingsContent title={t('accountDetails')}>
      <QuaiPayAvatar
        containerStyle={styles.avatarContainer}
        profilePicture={profilePictureImg}
      />
      <View style={styles.container}>
        <QuaiPayText type="H3">{t('displayName')}</QuaiPayText>
        <TextInput
          placeholder={t('placeholder.username') ?? ''}
          style={styles.input}
          onChangeText={setUsernameInput}
        >
          {usernameInput}
        </TextInput>
        <QuaiPayText type="H3">{t('linkPFP')}</QuaiPayText>
        <View style={styles.iconInput}>
          <Link />
          <TextInput
            placeholder={t('placeholder.profilePicture') ?? ''}
            style={[styles.input, styles.narrowInput]}
            onChangeText={setProfilePictureInput}
          >
            {profilePictureInput}
          </TextInput>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <QuaiPayText type="H3">{t('localCurrency')}</QuaiPayText>
        <QuaiPayText>{t('selectCurrency')}</QuaiPayText>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={[styles.input, styles.dropdownInput]}
          dropDownContainerStyle={[styles.input, styles.dropdownInput]}
          textStyle={styles.dropdownText}
        />
        <QuaiPayButton title={t('save')} onPress={handleSave} />
      </View>
    </QuaiPaySettingsContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    avatarContainer: { paddingTop: 24 },
    container: {
      paddingHorizontal: 16,
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    input: {
      borderColor: theme.border,
      borderRadius: 4,
      borderWidth: 1,
      color: theme.primary,
      height: 32,
      marginVertical: 8,
      padding: 8,
      width: Dimensions.get('window').width - 32,
    },
    narrowInput: {
      marginLeft: 8,
      width: Dimensions.get('window').width - 64,
    },
    bottomContainer: {
      alignItems: 'flex-start',
      padding: 16,
    },
    dropdownInput: {
      backgroundColor: theme.surface,
      height: 48,
      marginTop: 16,
      marginBottom: 48,
      padding: 0,
    },
    dropdownText: {
      color: theme.primary,
    },
    iconInput: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
  });
