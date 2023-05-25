/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  ExchangeScreen,
  HomeScreen,
  SettingScreen,
  EarnScreen,
} from '../../screens/MainCardScreen';
import WalletStack from '../../navigation/WalletStack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { styledColors } from '../../theme/styles';
import { useColorScheme } from 'react-native';
import { default as Icon } from 'react-native-vector-icons/FontAwesome';
import { default as AntIcon } from 'react-native-vector-icons/AntDesign';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialIcons';

type MainTabStackParamList = {
  Wallet: any;
  Exchange: any;
  Home: any;
  Earn: any;
  Setting: any;
};
const Tab = createBottomTabNavigator<MainTabStackParamList>();
const HomeStack = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Wallet') {
              return <AntIcon name="wallet" size={size} color={color} />;
            } else if (route.name === 'Exchange') {
              return (
                <MaterialIcon name="swap-horiz" size={size} color={color} />
              );
            } else if (route.name === 'Home') {
              return <AntIcon name="home" size={size} color={color} />;
            } else if (route.name === 'Earn') {
              return <Icon name="dollar" size={size} color={color} />;
            } else if (route.name === 'Setting') {
              return <AntIcon name="setting" size={size} color={color} />;
            } else {
            }
          },
          tabBarActiveTintColor: isDarkMode
            ? styledColors.white
            : styledColors.black,
          tabBarInactiveTintColor: isDarkMode
            ? styledColors.white
            : styledColors.black,
          tabBarActiveBackgroundColor: isDarkMode
            ? styledColors.dark
            : styledColors.lightGray,
          tabBarInactiveBackgroundColor: isDarkMode
            ? styledColors.black
            : styledColors.light,
        })}
      >
        <Tab.Screen
          name="Wallet"
          options={{ headerShown: false }}
          component={WalletStack}
        />
        <Tab.Screen
          name="Exchange"
          options={{ headerShown: false }}
          component={ExchangeScreen}
        />
        <Tab.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Earn"
          options={{ headerShown: false }}
          component={EarnScreen}
        />
        <Tab.Screen
          name="Setting"
          options={{ headerShown: false }}
          component={SettingScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
