import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from './shared/context/themeContext';
import { ReceiveStackParamList } from './main/home/receive/ReceiveStack';
import { SendStackParamList } from './main/home/send/SendStack';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  ReceiveStack: NavigatorScreenParams<ReceiveStackParamList>;
  SendStack: NavigatorScreenParams<SendStackParamList>;
};

const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const Navigation = () => {
  const { isDarkMode } = useTheme();
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
      />
    </NavigationContainer>
  );
};
