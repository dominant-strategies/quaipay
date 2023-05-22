import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { buttonStyle, fontStyle, styledColors } from '../../theme/styles';
import SwitchSelector from 'react-native-switch-selector';
import WalletInfo from '../../Components/WalletInfo';

type WalletScreenProps = {
  navigation: any;
};

function WalletScreen({ navigation }: WalletScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [sendPad, setSendPad] = useState<boolean>(true);

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
            initial={0}
            onPress={(value: boolean | ((prevState: boolean) => boolean)) =>
              setSendPad(value)
            }
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
              { label: 'Receive', value: 'r', imageIcon: undefined }, //images.masculino = require('./path_to/assets/img/masculino.png')
              { label: 'Send', value: 's', imageIcon: undefined }, //images.feminino = require('./path_to/assets/img/feminino.png')
            ]}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          />
        </View>
        {sendPad ? (
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
              <WalletInfo
                darkMode={isDarkMode}
                textColor={isDarkMode ? styledColors.white : styledColors.black}
                style={styles.walletView}
                ownerName="Alan Orwick"
                walletAddress="0x1462b732315cA025ab6351Ce1FB6F4F5d5748F0f"
              />
            </View>
            <View style={styles.buttonAreaInfo}>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    ...fontStyle.fontH3,
                    ...(isDarkMode ? buttonStyle.dark : buttonStyle.white),
                    borderRadius: 8,
                  }}
                >
                  Request
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.learnMoreAreaInfo}>
              <TouchableOpacity onPress={() => {}}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    ...fontStyle.fontSmallText,
                    color: styledColors.gray,
                    textDecorationLine: 'underline',
                  }}
                >
                  Learn more about QuaiPay
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <></>
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
  walletView: {
    marginTop: 50,
  },
  buttonAreaInfo: {
    marginTop: 15,
  },
  learnMoreAreaInfo: {
    marginTop: 15,
  },
});

export default WalletScreen;
