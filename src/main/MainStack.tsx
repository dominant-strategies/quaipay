/* eslint-disable react/no-unstable-nested-components */
import React, { useLayoutEffect, useState } from 'react';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import WalletIcon from 'src/shared/assets/account-box-outline.svg';
import SettingsIcon from 'src/shared/assets/icon-settings.svg';
import SendReceiveIcon from 'src/shared/assets/icon-send-receive.svg';
import { QuaiPayContent } from 'src/shared/components';
import { RootStackScreenProps } from 'src/shared/navigation';
import { useTheme } from 'src/shared/context/themeContext';
import { styledColors, typography } from 'src/shared/styles';

import SettingsScreen from 'src/main/settings/landing/SettingsScreen';
import HomeScreen from './home/HomeScreen';
import WalletScreen from './wallet/WalletScreen';
import { StyleSheet, View } from 'react-native';

export type MainTabStackParamList = {
  Wallet: undefined;
  Exchange: undefined;
  Home: undefined;
  Earn: undefined;
  Settings: undefined;
};

export type MainTabStackNavigationProp<
  Route extends keyof MainTabStackParamList,
> = BottomTabNavigationProp<MainTabStackParamList, Route>;

export type MainTabStackScreenProps<Route extends keyof MainTabStackParamList> =
  BottomTabScreenProps<MainTabStackParamList, Route>;

const Tab = createBottomTabNavigator<MainTabStackParamList>();

const MainStack: React.FC<RootStackScreenProps<'Main'>> = ({ route }) => {
  const insets = useSafeAreaInsets();
  const { isDarkMode, theme } = useTheme();
  const [shouldShowBackgroundVariant, setShouldShowBackgroundVariant] =
    useState(true);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'Home' || !routeName) {
      setShouldShowBackgroundVariant(true);
    } else {
      setShouldShowBackgroundVariant(false);
    }
  }, [route]);

  return (
    <QuaiPayContent
      noNavButton
      hasBackgroundVariant={shouldShowBackgroundVariant}
    >
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="none"
        screenOptions={{
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.primary,
          tabBarActiveBackgroundColor: isDarkMode
            ? styledColors.dark
            : styledColors.lightGray,
          headerShown: false,
          tabBarBadgeStyle: {
            marginTop: insets.bottom,
          },
          tabBarStyle: {
            marginBottom: -insets.bottom,
            backgroundColor: isDarkMode
              ? styledColors.black
              : styledColors.light,
            borderTopColor: isDarkMode
              ? styledColors.darkGray
              : styledColors.border,
          },
          tabBarLabelStyle: { ...typography.default },
        }}
      >
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <WalletIcon name="wallet" color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <View style={styles.homeTabBarIcon}>
                <SendReceiveIcon name="home" color={color} />
              </View>
            ),
            tabBarLabel: 'Send/Receive',
            tabBarLabelStyle: { ...typography.bold },
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <SettingsIcon name="setting" color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  homeTabBarIcon: {
    top: -18,
  },
});

export default MainStack;
