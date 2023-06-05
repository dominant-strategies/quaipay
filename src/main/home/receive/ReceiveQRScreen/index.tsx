import React from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ReceiveStackParamList } from '../ReceiveStack';
import { styledColors } from 'src/styles';

type ReceiveQRProps = NativeStackScreenProps<
  ReceiveStackParamList,
  'ReceiveQR'
>;

export const ReceiveQRScreen = ({}: ReceiveQRProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.safeAreaView]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
  },
});
