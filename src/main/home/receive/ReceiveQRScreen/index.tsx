import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { useTranslation } from 'react-i18next';

import { fontStyle, styledColors } from 'src/styles';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';

import { ReceiveStackParamList } from '../ReceiveStack';
import ShareControl from '../ShareControl';

type ReceiveQRProps = NativeStackScreenProps<
  ReceiveStackParamList,
  'ReceiveQR'
>;

export const ReceiveQRScreen = ({ navigation, route }: ReceiveQRProps) => {
  const { amount, unit } = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const { t } = useTranslation();
  const profilePicture = useProfilePicture();
  const username = useUsername();
  const wallet = useWallet();

  const share = () => console.log('Share triggered');
  const goToQuaiPayInfo = () => console.log('Go to QuaiPay Info');
  const complete = () => navigation.goBack();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
  };

  const primaryTextColor = isDarkMode ? styledColors.white : styledColors.black;
  const secondaryTextColor = isDarkMode
    ? styledColors.gray
    : styledColors.white;

  const walletCardBackgroundColor = isDarkMode
    ? styledColors.darkGray
    : styledColors.white;

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeAreaView]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={[
          styles.walletCard,
          { backgroundColor: walletCardBackgroundColor },
        ]}
      >
        <View style={styles.requestedAmount}>
          <Text style={{ color: secondaryTextColor }}>
            ${amount} {unit}
          </Text>
          <Text style={[styles.mainAmount, { color: primaryTextColor }]}>
            {amount} {unit}
          </Text>
        </View>
        <View style={styles.qrCode}>
          <QRCode
            value={JSON.stringify({
              address: wallet?.address,
              username,
              amount,
              unit,
            })}
            logo={{ uri: profilePicture }}
            logoSize={50}
            logoBackgroundColor="transparent"
            logoBorderRadius={50}
            size={140}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: primaryTextColor }]}>
            {username}
          </Text>
          <Text
            style={[fontStyle.fontParagraph, { color: secondaryTextColor }]}
          >
            {wallet && wallet?.address.slice(0, 8)}...
            {wallet?.address.slice(-8)}
          </Text>
        </View>
        <View style={styles.shareControl}>
          <ShareControl />
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={share} style={styles.shareButton}>
          <Text style={{ color: styledColors.white }}>{t('common.share')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.learnMore} onPress={goToQuaiPayInfo}>
          <Text style={styles.learnMoreText}>Learn more about QuaiPay</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.completeButton} onPress={complete}>
        <Text style={{ color: styledColors.white }}>
          {t('receive.qrScreen.complete')}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
  },
  walletCard: {
    borderRadius: 8,
    marginTop: 12,
    marginHorizontal: 16,
    paddingVertical: 36,
  },
  requestedAmount: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainAmount: {
    ...fontStyle.fontH2,
  },
  qrCode: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: styledColors.white,
    borderColor: styledColors.lightGray,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  username: {
    ...fontStyle.fontH2,
    fontSize: 20,
  },
  shareControl: {
    marginTop: 20,
    alignItems: 'center',
  },
  shareButton: {
    borderRadius: 8,
    backgroundColor: styledColors.normal,
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 16,
    paddingHorizontal: 140,
  },
  learnMore: {
    marginTop: 12,
    marginBottom: 20,
  },
  learnMoreText: {
    ...fontStyle.fontSmallText,
    color: styledColors.gray,
    textDecorationLine: 'underline',
  },
  completeButton: {
    alignItems: 'center',
    backgroundColor: styledColors.gray,
    marginHorizontal: 30,
    borderRadius: 8,
    paddingVertical: 16,
  },
});
