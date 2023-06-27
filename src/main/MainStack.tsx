/* eslint-disable react/no-unstable-nested-components */
import React, { useLayoutEffect, useState } from 'react';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { default as AntIcon } from 'react-native-vector-icons/AntDesign';

import { QuaiPayContent } from 'src/shared/components';
import { RootStackScreenProps } from 'src/shared/navigation';
import { useTheme } from 'src/shared/context/themeContext';
import { styledColors } from 'src/shared/styles';

import SettingsScreen from './settings/SettingsScreen';
import HomeScreen from './home/HomeScreen';
import WalletScreen from './wallet/WalletScreen';

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
        }}
      >
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntIcon name="wallet" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntIcon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntIcon name="setting" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </QuaiPayContent>
  );
};

export default MainStack;
