import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ReceiveStackParamList } from '../ReceiveStack';
import { fontStyle, styledColors } from 'src/styles';
import { useProfilePicture, useUsername, useWallet } from 'src/shared/hooks';
import QRCode from 'react-native-qrcode-svg';

type ReceiveQRProps = NativeStackScreenProps<
  ReceiveStackParamList,
  'ReceiveQR'
>;

export const ReceiveQRScreen = ({ route }: ReceiveQRProps) => {
  const { amount, unit } = route.params;

  const isDarkMode = useColorScheme() === 'dark';
  const profilePicture = useProfilePicture();
  const username = useUsername();
  const wallet = useWallet();

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
      </View>
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
    marginTop: 80,
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
});
