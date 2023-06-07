import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';

import { RootStackParamList } from 'src/App';
import { buttonStyle, styledColors } from 'src/shared/styles';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';
import Loader from 'src/shared/Loader';

import ShareControl from '../ShareControl';
import { useTranslation } from 'react-i18next';
import { QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

export const ReceiveScreen = () => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const isDarkMode = useColorScheme() === 'dark';
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Main'>>();
  const profilePicture = useProfilePicture();
  const username = useUsername();
  const wallet = useWallet();
  if (!profilePicture || !username || !wallet) {
    return <Loader text={'Loading...'} />;
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
        },
      ]}
    >
      <View
        style={[
          styles.walletView,
          styles.switchStyle,
          {
            backgroundColor: isDarkMode
              ? styledColors.dark
              : styledColors.white,
            borderColor: isDarkMode
              ? styledColors.darkGray
              : styledColors.border,
          },
        ]}
      >
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
          {wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}
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
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    ownerName: {
      fontSize: 20,
    },
    walletAddress: {
      color: theme.secondary,
    },
    switchStyle: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    qrcodeStyle: {
      backgroundColor: '#FFFFFF',
      padding: 8,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: styledColors.lightGray,
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
      marginTop: 120,
      backgroundColor: 'red',
      width: '100%',
      paddingVertical: 40,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 8,
      borderWidth: 1,
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
  });
