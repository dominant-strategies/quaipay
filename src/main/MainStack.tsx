/* eslint-disable react/no-unstable-nested-components */
import React, { useLayoutEffect, useState } from 'react';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { default as Icon } from 'react-native-vector-icons/FontAwesome';
import { default as AntIcon } from 'react-native-vector-icons/AntDesign';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';

import { QuaiPayContent } from 'src/shared/components';
import { RootStackScreenProps } from 'src/shared/navigation';
import { useTheme } from 'src/shared/context/themeContext';
import { styledColors } from 'src/shared/styles';

import ExchangeScreen from './exchange/ExchangeScreen';
import EarnScreen from './earn/EarnScreen';
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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Wallet') {
            return <AntIcon name="wallet" size={size} color={color} />;
          } else if (route.name === 'Exchange') {
            return <MaterialIcon name="swap-horiz" size={size} color={color} />;
          } else if (route.name === 'Home') {
            return <AntIcon name="home" size={size} color={color} />;
          } else if (route.name === 'Earn') {
            return <Icon name="dollar" size={size} color={color} />;
          } else if (route.name === 'Settings') {
            return <AntIcon name="setting" size={size} color={color} />;
          } else {
          }
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.primary,
        tabBarActiveBackgroundColor: isDarkMode
          ? styledColors.dark
          : styledColors.lightGray,
        tabBarInactiveBackgroundColor: isDarkMode
          ? styledColors.black
          : styledColors.light,
        headerShown: false,
          tabBarBadgeStyle: {
            marginTop: insets.bottom,
          },
          tabBarStyle: {
            marginBottom: -insets.bottom,
            backgroundColor: isDarkMode
              ? styledColors.black
              : styledColors.light,
          },
      })}
    >
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Exchange" component={ExchangeScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Earn" component={EarnScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
    </QuaiPayContent>
  );
};

export default MainStack;
