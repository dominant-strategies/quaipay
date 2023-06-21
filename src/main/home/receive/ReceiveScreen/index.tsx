import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

import { RootStackNavigationProps } from 'src/shared/navigation';
import { buttonStyle } from 'src/shared/styles';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';

import ShareControl from '../ShareControl';
import { useTranslation } from 'react-i18next';
import {
  QuaiPayContent,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { abbreviateAddress } from 'src/shared/services/quais';

export const ReceiveScreen = () => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<RootStackNavigationProps<'Main'>>();
  const profilePicture = useProfilePicture();
  const username = useUsername();
  const wallet = useWallet();
  if (!profilePicture || !username || !wallet) {
    return <QuaiPayLoader text={'Loading...'} />;
  }
  return (
    <QuaiPayContent
      noNavButton
      hasBackgroundVariant
      containerStyle={styles.container}
    >
      <View style={styles.separator} />
      <View style={styles.walletView}>
        <View style={styles.qrcodeStyle}>
          <QRCode
            value={JSON.stringify({
              address: wallet.address,
              username,
            })}
            logo={{ uri: profilePicture }}
            logoSize={50}
            logoBackgroundColor="transparent"
            size={140}
          />
        </View>
        <QuaiPayText type="H2" style={styles.ownerName}>
          {username}
        </QuaiPayText>
        <QuaiPayText type="paragraph" style={styles.walletAddress}>
          {abbreviateAddress(wallet.address)}
        </QuaiPayText>
        <View style={styles.shareControlStyle}>
          <ShareControl />
        </View>
      </View>
      <View style={styles.buttonAreaInfo}>
        <TouchableOpacity
          style={isDarkMode ? buttonStyle.dark : buttonStyle.white}
          onPress={() => {
            navigation.navigate('ReceiveStack', {
              screen: 'ReceiveAmountInput',
              params: { wallet },
            });
          }}
        >
          <QuaiPayText type="H3">{t('common.request')}</QuaiPayText>
        </TouchableOpacity>
      </View>
      <View style={styles.learnMoreAreaInfo}>
        <TouchableOpacity onPress={() => {}}>
          <QuaiPayText style={styles.learnMoreText}>
            Learn more about QuaiPay
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
      paddingTop: 40,
    },
    ownerName: {
      fontSize: 20,
    },
    walletAddress: {
      color: theme.secondary,
    },
    qrcodeStyle: {
      backgroundColor: '#FFFFFF',
      padding: 8,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.border,
      width: 156,
      height: 156,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    shareControlStyle: {
      marginTop: 20,
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
