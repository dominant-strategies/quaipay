import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import QRCode, { QRCodeProps } from 'react-native-qrcode-svg';

import { useProfilePicture, useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';
import { styledColors } from 'src/shared/styles';

const QR_SIZE = 156;
const LOGO_SIZE = 60;

interface QuaiPayQRCodeProps extends QRCodeProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const QuaiPayQRCode: React.FC<QuaiPayQRCodeProps> = ({
  containerStyle,
  logo,
  logoBackgroundColor = 'transparent',
  logoBorderRadius = LOGO_SIZE / 2,
  logoSize = LOGO_SIZE,
  size = QR_SIZE,
  ...props
}) => {
  const styles = useThemedStyle(themedStyles);
  const profilePicture = useProfilePicture();

  return (
    <View style={[styles.qrCode, ...(containerStyle ? [containerStyle] : [])]}>
      <QRCode
        logo={logo ? logo : { uri: profilePicture }}
        logoSize={logoSize}
        logoBorderRadius={logoBorderRadius}
        logoBackgroundColor={logoBackgroundColor}
        size={size}
        {...props}
      />
    </View>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    qrCode: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 4,
      backgroundColor: styledColors.white,
      borderColor: theme.border,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });
