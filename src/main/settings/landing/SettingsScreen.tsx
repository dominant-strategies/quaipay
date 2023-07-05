import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RootNavigator } from 'src/shared/navigation/utils';

import { MainTabStackScreenProps } from 'src/main/MainStack';
import { Theme } from 'src/shared/types';
import AvatarPlaceHolder from 'src/shared/assets/avatarPlaceholder.svg';
import { useThemedStyle, useUsername, useWallet } from 'src/shared/hooks';
import { fontStyle, styledColors } from 'src/shared/styles';
import {
  QuaiPayButton,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import { abbreviateAddress } from 'src/shared/services/quais';
import { Icons } from 'src/main/settings/landing/Icons';

const SettingsScreen: React.FC<MainTabStackScreenProps<'Settings'>> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.landing',
  });
  const styles = useThemedStyle(themedStyle);

  const username = useUsername();
  const wallet = useWallet();
  const goToExport = () =>
    RootNavigator.navigate('ExportStack', { screen: 'ExportLanding' });
  const goToAccountDetails = () =>
    RootNavigator.navigate('SettingsStack', { screen: 'AccountDetails' });

  if (!wallet) {
    return <QuaiPayLoader text={'Loading wallet...'} />;
  }

  return (
    <View>
      <View style={styles.top}>
        <AvatarPlaceHolder style={styles.avatar} width={96} height={96} />
      </View>
      <View style={styles.middle}>
        <QuaiPayText style={styles.username}>{username}</QuaiPayText>
        <QuaiPayText themeColor="secondary">
          {abbreviateAddress(wallet.address)}
        </QuaiPayText>
        <Icons />
        <View style={styles.buttonContainer}>
          <QuaiPayButton
            title={t('chooseAddress')}
            containerStyle={styles.chooseAddressButtonContainer}
            style={styles.button}
            onPress={() => {
              goToAccountDetails();
            }}
          />
          <QuaiPayButton
            title={t('earn')}
            containerStyle={styles.earnButtonContainer}
            style={[styles.button, styles.earnButton]}
            type="secondary"
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    top: {
      backgroundColor: theme.background,
      height: Dimensions.get('window').height * 0.2,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      position: 'relative',
    },
    middle: {
      paddingHorizontal: 32,
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
    },
    avatar: {
      borderColor: theme.surface,
      borderWidth: 6,
      borderRadius: 48,
      bottom: -30,
      left: Dimensions.get('window').width / 2 - 48,
      position: 'absolute',
    },
    username: {
      ...fontStyle.fontH2,
      fontSize: 20,
      marginTop: 30,
    },

    chooseAddressButtonContainer: {
      width: 200,
    },
    earnButtonContainer: {
      width: 100,
    },
    button: {
      height: 32,
      padding: 0,
      justifyContent: 'center',
    },
    earnButton: { borderColor: styledColors.gray, borderWidth: 1 },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
  });

export default SettingsScreen;
