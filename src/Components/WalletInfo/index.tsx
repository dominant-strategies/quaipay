import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontStyle, styledColors } from '../../theme/styles';
import ShareControl from '../ShareControl';
import QRIcon from '../../../assets/icons/QR.svg';

type WalletInfoProps = {
  darkMode: boolean;
  textColor: string;
  ownerName: string;
  walletAddress: string;
  style: any;
};

function WalletInfo({
  textColor,
  ownerName,
  walletAddress,
  style,
}: WalletInfoProps) {
  return (
    <View style={{ ...style, ...styles.switchStyle }}>
      <View style={styles.qrcodeStyle}>
        <QRIcon width={136} height={136} />
      </View>
      <Text
        style={[styles.ownerName, { ...fontStyle.fontH2, color: textColor }]}
      >
        {ownerName}
      </Text>
      <Text style={{ ...fontStyle.fontParagraph, color: styledColors.gray }}>
        {walletAddress.slice(0, 8)}...
        {walletAddress.slice(walletAddress.length - 8, walletAddress.length)}
      </Text>
      <View style={styles.shareControlStyle}>
        <ShareControl />
      </View>
    </View>
  );
}

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
});

export default WalletInfo;
