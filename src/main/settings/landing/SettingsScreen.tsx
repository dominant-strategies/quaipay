import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { RootNavigator } from 'src/shared/navigation/utils';

import { MainTabStackScreenProps } from 'src/main/MainStack';
import { Theme } from 'src/shared/types';
import AvatarPlaceHolder from 'src/shared/assets/avatarPlaceholder.svg';
import PiggyBank from 'src/shared/assets/piggyBank.svg';
import Card from 'src/shared/assets/card.svg';
import Send from 'src/shared/assets/send.svg';
import Receive from 'src/shared/assets/receive.svg';
import Account from 'src/shared/assets/account.svg';
import { useThemedStyle, useUsername, useWallet } from 'src/shared/hooks';
import { fontStyle, styledColors } from 'src/shared/styles';
import {
  QuaiPayButton,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import { abbreviateAddress } from 'src/shared/services/quais';

const SettingsScreen: React.FC<MainTabStackScreenProps<'Settings'>> = () => {
  const styles = useThemedStyle(themedStyle);
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.landing',
  });

  const username = useUsername();
  const wallet = useWallet();
  const goToExport = () =>
    RootNavigator.navigate('ExportStack', { screen: 'ExportLanding' });

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
        <View style={styles.iconsWrapper}>
          <View style={styles.iconText}>
            <View style={styles.icon}>
              <PiggyBank />
            </View>
            <QuaiPayText>{t('invest')}</QuaiPayText>
          </View>
          <View style={styles.iconText}>
            <View style={styles.icon}>
              <Card />
            </View>
            <QuaiPayText>{t('payment')}</QuaiPayText>
          </View>
          <View style={styles.iconText}>
            <View style={styles.icon}>
              <Send />
            </View>
            <QuaiPayText>{t('send')}</QuaiPayText>
          </View>
          <View style={styles.iconText}>
            <View style={styles.icon}>
              <Receive />
            </View>
            <QuaiPayText>{t('receive')}</QuaiPayText>
          </View>
          <View style={styles.iconText}>
            <View style={styles.icon}>
              <Account />
            </View>
            <QuaiPayText>{t('account')}</QuaiPayText>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <QuaiPayButton
            title={t('chooseAddress')}
            containerStyle={styles.chooseAddressButtonContainer}
            style={styles.button}
            onPress={() => {}}
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
    icon: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.border,
      borderWidth: 1,
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    iconText: {
      justifyContent: 'center',
    },
    iconsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      marginBottom: 20,
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
