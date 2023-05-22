import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { fontStyle, styledColors } from '../../theme/styles';
import ShareControl from '../ShareControl';

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
        <Image source={require('./Vector.png')} />
      </View>
      <Text style={{ ...fontStyle.fontH2, color: textColor, fontSize: 20 }}>
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
  },
  shareControlStyle: {
    marginTop: 20,
  },
});

export default WalletInfo;
