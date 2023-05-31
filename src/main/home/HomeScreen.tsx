import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';
  const [switchValue, setSwitchValue] = useState<SwitchValue>(
    SwitchValue.Receive,
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.light,
    width: '100%',
    height: '100%',
    flex: 1,
  };

  const topViewStyle = {
    // backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    flex: 1,
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
                label: t('home.receive.label'),
                value: SwitchValue.Receive,
                imageIcon: undefined,
              },
              {
                label: t('home.send.label'),
                value: SwitchValue.Send,
                imageIcon: undefined,
              },
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          />
        </View>
        {switchValue ? (
          <SendStack />
        ) : (
          <View
            style={{
              ...styles.walletCardStyle,
            }}
          >
            <ReceiveStack />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switchStyle: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1,
    marginHorizontal: 16,
  },
  walletCardStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;
