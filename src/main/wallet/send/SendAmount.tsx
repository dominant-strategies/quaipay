import React from 'react';
import { SafeAreaView, Text, useColorScheme } from 'react-native';

import { styledColors } from '../../../styles';

type SendAmountScreenProps = {
  navigation: any;
};

function SendAmountScreen({}: SendAmountScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Amount Input</Text>
    </SafeAreaView>
  );
}

export default SendAmountScreen;
