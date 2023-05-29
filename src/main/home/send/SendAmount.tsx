import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { styledColors } from '../../../styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SendStackStackParamList } from './SendStack';

type SendAmountScreenProps = NativeStackScreenProps<
  SendStackStackParamList,
  'SendAmount'
>;

function SendAmountScreen({ route }: SendAmountScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  console.log('route.params', route.params);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  const topViewStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={topViewStyle}>
        <View style={styles.switchStyle}>
          <Text>Amount Input</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchStyle: {},
});

export default SendAmountScreen;
