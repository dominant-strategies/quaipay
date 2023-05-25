import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { fontStyle, styledColors } from '../../styles';
import ReceiveStack from './receive/ReceiveStack';
import SendStack from './send/SendStack';

type HomeScreenProps = {
  navigation: any;
};

enum SwitchValue {
  Receive = 0,
  Send = 1,
}

function HomeScreen({}: HomeScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [switchValue, setSwitchValue] = useState<SwitchValue>(
    SwitchValue.Receive,
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
  };

  const topViewStyle = {
    // backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    marginLeft: 16,
    marginRight: 16,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={topViewStyle}>
        <View style={styles.switchStyle}>
          <SwitchSelector
            initial={SwitchValue.Receive}
            onPress={(
              value: SwitchValue | ((prevState: SwitchValue) => SwitchValue),
            ) => setSwitchValue(value)}
            textColor={isDarkMode ? styledColors.white : styledColors.black}
            selectedColor={styledColors.black}
            buttonColor={styledColors.white}
            borderColor={styledColors.gray}
            backgroundColor={
              !isDarkMode ? styledColors.lightGray : styledColors.black
            }
            textStyle={fontStyle.fontParagraph}
            selectedTextStyle={fontStyle.fontParagraph}
            hasPadding
            buttonMargin={2}
            options={[
              {
                label: 'Receive',
                value: SwitchValue.Receive,
                imageIcon: undefined,
              },
              { label: 'Send', value: SwitchValue.Send, imageIcon: undefined },
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          />
        </View>
        {switchValue ? (
          <SendStack />
        ) : (
          <>
            <View
              style={{
                ...styles.walletCardStyle,
                backgroundColor: isDarkMode
                  ? styledColors.dark
                  : styledColors.white,
                borderColor: isDarkMode
                  ? styledColors.darkGray
                  : styledColors.lightGray,
              }}
            >
              <ReceiveStack />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchStyle: {
    marginTop: 40,
  },
  walletCardStyle: {
    marginTop: 90,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: styledColors.lightGray,
    height: 360,
  },
});

export default HomeScreen;
