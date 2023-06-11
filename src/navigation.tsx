import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { useTheme } from './shared/context/themeContext';

export type RootStackParamList = {};

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
