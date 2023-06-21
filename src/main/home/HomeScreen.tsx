import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import { styledColors } from 'src/shared/styles';

import { ReceiveScreen } from './receive/ReceiveScreen/';
import SendScanScreen from './send/SendScan';
import { MainTabStackScreenProps } from '../MainStack';

const HomeScreen: React.FC<MainTabStackScreenProps<'Home'>> = () => {
  const switchValue = true;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
    flex: 1,
  };

  const topViewStyle = {
    flex: 1,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={topViewStyle}>
        {switchValue ? (
          <SendScanScreen />
        ) : (
          <View
            style={{
              ...styles.walletCardStyle,
            }}
          >
            <ReceiveScreen />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  walletCardStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
