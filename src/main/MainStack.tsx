/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { default as Icon } from 'react-native-vector-icons/FontAwesome';
import { default as AntIcon } from 'react-native-vector-icons/AntDesign';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from 'src/shared/context/themeContext';
import { styledColors } from 'src/shared/styles';

import ExchangeScreen from './exchange/ExchangeScreen';
import EarnScreen from './earn/EarnScreen';
import SettingScreen from './settings/SettingScreen';
import HomeScreen from './home/HomeScreen';
import WalletScreen from './wallet/WalletScreen';

type MainTabStackParamList = {
  Wallet: undefined;
  Exchange: undefined;
  Home: undefined;
  Earn: undefined;
  Setting: undefined;
};

export type MainTabStackNavigationProp<
  Route extends keyof MainTabStackParamList,
> = BottomTabNavigationProp<MainTabStackParamList, Route>;

export type MainTabStackScreenProps<Route extends keyof MainTabStackParamList> =
  BottomTabScreenProps<MainTabStackParamList, Route>;

const Tab = createBottomTabNavigator<MainTabStackParamList>();

const MainStack = () => {
  const { isDarkMode, theme } = useTheme();

  return (
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
          } else if (route.name === 'Setting') {
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
      })}
    >
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Exchange" component={ExchangeScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Earn" component={EarnScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default MainStack;
