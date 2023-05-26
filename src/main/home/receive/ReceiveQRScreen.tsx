import React from 'react';
import {
  Dimensions,
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
