/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import { generateSecureRandom } from 'react-native-securerandom';
import { retrieveStoredItem, storeItem } from '../../storage/keychain';
import { KeychainKeys } from '../../storage/constants';
import { quais } from 'quais';
import Loader from '../../Components/Loader';
import * as buffer from 'buffer';

// import { useNavigation } from '@react-navigation/native';
// import { HomeScreenNavigationProp } from '../navigation/types';

type WelcomeTitleProps = PropsWithChildren<{}>;

function WelcomeTitle({ children }: WelcomeTitleProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {};
  return (
    <View style={styles.welcomeTitleView}>
      <Text style={styles.welcomeTitle}>{children}</Text>
    </View>
  );
}

type WelcomeDescriptionProps = PropsWithChildren<{}>;

function WelcomeDescription({
  children,
}: WelcomeDescriptionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {};
  return (
    <View style={styles.welcomeDescriptionView}>
      <Text style={styles.welcomeDescription}>{children}</Text>
    </View>
  );
}

type LoginActionSectionProps = {
  navigation: any;
  setSettingUpWallet: (value: boolean) => void;
};

const accountHDPath = `m/44'/994'/0'/0`;

function LoginActionSection({
  navigation,
  setSettingUpWallet,
}: LoginActionSectionProps): JSX.Element {
  // const navigation = useNavigation<HomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {};

  const onPressLogin = () => {};
  const onPressSetup = useCallback(async () => {
    try {
      setSettingUpWallet(true);
      const entropy = await generateSecureRandom(32);
      const encodedEntropy = buffer.Buffer.from(entropy).toString('base64');
      // const decodedEntropy = Uint8Array.from(
      //   buffer.Buffer.from(encodedEntropy, 'base64').toString('binary'),
      //   c => c.charCodeAt(0),
      // );
      // console.log(decodedEntropy);
      await storeItem({
        key: KeychainKeys.entropy,
        value: encodedEntropy,
      });

      const HDNode = quais.utils.HDNode.fromSeed(entropy);
      const childNodes = quais.utils.getAllShardsAddressChildNode(
        HDNode,
        accountHDPath,
      );

      await Promise.all(
        childNodes.map((node, ind: number) => {
          type ZoneIndex = Exclude<
            keyof typeof KeychainKeys,
            'username' | 'profilePicture' | 'location' | 'entropy'
          >;
          const zoneIndex = `zone-${Math.floor(ind / 3)}-${ind % 3}`;
          return storeItem({
            key: KeychainKeys[zoneIndex as ZoneIndex],
            value: JSON.stringify(node),
          });
        }),
      );
    } catch (err) {
      if (err instanceof Error) {
        console.log('failed to set up wallet', err.message, err.stack);
      } else {
        console.log('failed to set up wallet', err);
      }
    } finally {
      setSettingUpWallet(false);
    }

    navigation.navigate('Setup');
  }, []);

  return (
    <View style={styles.loginActionSectionView}>
      <Button onPress={onPressSetup} title="Setup" color={Colors.black} />
      <Text style={styles.loginSection} onPress={onPressLogin}>
        Already have an account? Click here to login.
      </Text>
    </View>
  );
}

// TODO: type navigation here and in child component
type WelcomeScreenProps = {
  navigation: any;
};
function WelcomeScreen({ navigation }: WelcomeScreenProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [settingUpWallet, setSettingUpWallet] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  };

  if (settingUpWallet) return <Loader text="Setting up wallet" />;
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <WelcomeTitle>Welcome to Quai Pay.</WelcomeTitle>
        <WelcomeDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum
        </WelcomeDescription>
        <LoginActionSection
          setSettingUpWallet={setSettingUpWallet}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  welcomeTitleView: {},
  welcomeTitle: {
    color: Colors.black,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
  },
  loginActionSectionView: {
    marginTop: 40,
  },
  loginSection: {
    color: Colors.black,
    verticalAlign: 'middle',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 30,
  },
  welcomeDescriptionView: {
    marginTop: 40,
  },
  welcomeDescription: {
    color: Colors.light,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 20,
  },
});

export default WelcomeScreen;
