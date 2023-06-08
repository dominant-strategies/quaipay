import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SendStackParamList } from '../SendStack';
import { styledColors } from 'src/shared/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type SendConfirmationScreenProps = NativeStackScreenProps<
  SendStackParamList,
  'SendConfirmation'
>;

function SendConfirmationScreen({}: SendConfirmationScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';

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
          <Text>Confirmation Screen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchStyle: {},
});

export default SendConfirmationScreen;
