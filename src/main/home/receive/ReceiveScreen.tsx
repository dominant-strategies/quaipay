import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';

import { RootStackParamList } from '../../../App';
import { buttonStyle, fontStyle, styledColors } from '../../../styles';
import {
  useProfilePicture,
  useUsername,
  useWallet,
} from '../../../shared/hooks';
import Loader from '../../../shared/components/Loader';

import ShareButtons from '../../../shared/components/ShareButtons';
import { useTranslation } from 'react-i18next';

export const ReceiveScreen = () => {
  const { t } = useTranslation();
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
        <Text
          style={[
            styles.ownerName,
            {
              ...fontStyle.fontH2,
              color: isDarkMode ? styledColors.white : styledColors.black,
            },
          ]}
        >
          {username}
        </Text>
        <Text style={{ ...fontStyle.fontParagraph, color: styledColors.gray }}>
          {wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}
        </Text>
        <View style={styles.shareControlStyle}>
          <ShareButtons />
        </View>
      </View>
      <View style={styles.buttonAreaInfo}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ReceiveStack', {
              screen: 'ReceiveAmountInput',
            });
          }}
        >
          <Text
            style={{
              ...fontStyle.fontH3,
              ...(isDarkMode ? buttonStyle.dark : buttonStyle.white),
            }}
          >
            {t('common.request')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.learnMoreAreaInfo}>
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{
              ...fontStyle.fontSmallText,
              ...styles.learnMoreText,
            }}
          >
            Learn more about QuaiPay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  ownerName: {
    fontSize: 20,
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
    color: styledColors.gray,
    textDecorationLine: 'underline',
  },
});
