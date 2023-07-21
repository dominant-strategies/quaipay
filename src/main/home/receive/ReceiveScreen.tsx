import React from 'react';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTranslation } from 'react-i18next';

import CopyOutline from 'src/shared/assets/copyOutline.svg';
import ChevronMiniUp from 'src/shared/assets/chevronUpMini.svg';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayLoader,
  QuaiPayQRCode,
  QuaiPayText,
} from 'src/shared/components';
import { RootStackNavigationProps } from 'src/shared/navigation';
import { buttonStyle } from 'src/shared/styles';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { abbreviateAddress } from 'src/shared/services/quais';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { useWalletContext } from 'src/shared/context/walletContext';
import { useZone } from 'src/shared/hooks/useZone';

export const ReceiveScreen = () => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const { showSnackBar } = useSnackBar();
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<RootStackNavigationProps<'Main'>>();
  const { profilePicture } = useWalletContext(); // get bare profile picture state
  useProfilePicture(); // fetch profilePicture
  const username = useUsername();
  const wallet = useWallet();
  const { domainName } = useZone();

  if (!profilePicture || !username || !wallet) {
    return <QuaiPayLoader text={'Loading...'} />;
  }

  const copyToClipboard = () => {
    Clipboard.setString(wallet.address);
    showSnackBar({
      message: t('home.receive.copiedToClipboard'),
      moreInfo: abbreviateAddress(wallet.address),
      type: 'success',
    });
  };

  return (
    <QuaiPayContent
      noNavButton
      hasBackgroundVariant
      containerStyle={styles.container}
    >
      <View style={styles.separator} />
      <View style={styles.walletView}>
        <QuaiPayQRCode
          value={JSON.stringify({
            address: wallet.address,
            username,
            profilePicture,
          })}
        />
        <QuaiPayText type="H2" style={styles.ownerName}>
          {username}
        </QuaiPayText>
        <Pressable
          onLongPress={copyToClipboard}
          style={({ pressed }) => [
            styles.addressContainer,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="paragraph" themeColor="secondary">
            {abbreviateAddress(wallet.address)}
          </QuaiPayText>
          <CopyOutline />
        </Pressable>
        <QuaiPayButton
          pill
          outlined
          type="secondary"
          style={styles.activeAddressPill}
          containerStyle={styles.activeAddressPillContainer}
          title={domainName ?? ''}
          RightIcon={ChevronMiniUp}
        />
      </View>
      <View style={styles.buttonAreaInfo}>
        <TouchableOpacity
          style={isDarkMode ? buttonStyle.dark : buttonStyle.white}
          onPress={() => {
            navigation.navigate('ReceiveStack', {
              screen: 'ReceiveAmountInput',
            });
          }}
        >
          <QuaiPayText type="H3">{t('common.request')}</QuaiPayText>
        </TouchableOpacity>
      </View>
      <View style={styles.learnMoreAreaInfo}>
        <TouchableOpacity onPress={() => {}}>
          <QuaiPayText style={styles.learnMoreText}>
            {t('common.learnMore')}
          </QuaiPayText>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 80,
    },
    ownerName: {
      fontSize: 20,
    },
    addressContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginLeft: 8, // To compensate the gap and keep address centered
    },
    activeAddressPillContainer: {
      marginTop: 20,
    },
    activeAddressPill: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignSelf: 'center', // to avoid stretching horizontally
    },
    walletView: {
      height: Dimensions.get('window').height / 2,
      width: '100%',
      paddingVertical: 40,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: theme.surface,
      borderColor: theme.border,
    },
    buttonAreaInfo: {
      marginTop: 15,
    },
    learnMoreAreaInfo: {
      marginTop: 15,
    },
    learnMoreText: {
      color: theme.secondary,
      textDecorationLine: 'underline',
    },
    separator: {
      flex: 1,
    },
  });
