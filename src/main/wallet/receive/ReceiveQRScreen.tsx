import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import QRIcon from './QR.svg';
import { buttonStyle, fontStyle, styledColors } from '../../../styles';
import ShareControl from './ShareControl';

type ReceiveQRScreenProps = {
  navigation: any;
};

const walletAddress = '0x1462b732315cA025ab6351Ce1FB6F4F5d5748F0f';

export const ReceiveQRScreen = ({}: ReceiveQRScreenProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <View style={{ ...styles.walletView, ...styles.switchStyle }}>
        <View style={styles.qrcodeStyle}>
          <QRIcon width={136} height={136} />
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
          Alan Orwick
        </Text>
        <Text style={{ ...fontStyle.fontParagraph, color: styledColors.gray }}>
          {walletAddress.slice(0, 8)}...
          {walletAddress.slice(walletAddress.length - 8, walletAddress.length)}
        </Text>
        <View style={styles.shareControlStyle}>
          <ShareControl />
        </View>
      </View>
      <View style={styles.buttonAreaInfo}>
        <TouchableOpacity onPress={() => {}}>
          <Text
            style={{
              ...fontStyle.fontH3,
              ...(isDarkMode ? buttonStyle.dark : buttonStyle.white),
            }}
          >
            Request
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
    </>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 50,
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
