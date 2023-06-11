import React from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { useTheme } from './shared/context/themeContext';
import ReceiveStack, {
  ReceiveStackParamList,
} from './main/home/receive/ReceiveStack';
import SendStack, { SendStackParamList } from './main/home/send/SendStack';
import MainStack from './main/MainStack';
import OnboardingStack from './onboarding/OnboardingStack';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  ReceiveStack: NavigatorScreenParams<ReceiveStackParamList>;
  SendStack: NavigatorScreenParams<SendStackParamList>;
};

const navigationRef = createNavigationContainerRef<RootStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

// TODO: refactor to handle app state via context
interface NavigationProps {
  onboarded: boolean;
}

export const Navigation = ({ onboarded }: NavigationProps) => {
  const { isDarkMode } = useTheme();
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
      />
      <AppNavigator onboarded={onboarded} />
    </NavigationContainer>
  );
};

const AppNavigator = ({ onboarded }: NavigationProps) => {
  return (
    <Stack.Navigator
      initialRouteName={onboarded ? 'Main' : 'Onboarding'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingStack}
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          title: 'onboarding',
        }}
      />
      <Stack.Screen
        name="Main"
        component={MainStack}
        options={{
          gestureEnabled: false,
          title: 'Main',
        }}
      />
      <Stack.Screen
        name="ReceiveStack"
        component={ReceiveStack}
        options={{
          title: 'ReceiveStack',
        }}
      />
      <Stack.Screen
        name="SendStack"
        component={SendStack}
        options={{
          title: 'SendStack',
        }}
      />
    </Stack.Navigator>
  );
};
