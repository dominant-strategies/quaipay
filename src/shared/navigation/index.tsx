import React from 'react';
import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';

import ReceiveStack, {
  ReceiveStackParamList,
} from 'src/main/home/receive/ReceiveStack';
import SendStack, { SendStackParamList } from 'src/main/home/send/SendStack';
import MainStack, { MainTabStackParamList } from 'src/main/MainStack';
import OnboardingStack from 'src/onboarding/OnboardingStack';
import ExportStack, {
  ExportStackParamList,
} from 'src/main/settings/export/ExportStack';
import SettingsStack, {
  SettingsStackParamList,
} from 'src/main/settings/SettingsStack';

import { useTheme } from '../context/themeContext';
import { RootNavigator } from './utils';
import { QuaiPaySnackBar } from '../components';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: NavigatorScreenParams<MainTabStackParamList>;
  ReceiveStack: NavigatorScreenParams<ReceiveStackParamList>;
  SendStack: NavigatorScreenParams<SendStackParamList>;
  ExportStack: NavigatorScreenParams<ExportStackParamList>;
  SettingsStack: NavigatorScreenParams<SettingsStackParamList>;
};

export type RootStackNavigationProps<Route extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, Route>;

export type RootStackScreenProps<Route extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Route>;

const Stack = createStackNavigator<RootStackParamList>();

// TODO: refactor to handle app state via context
interface NavigationProps {
  onboarded: boolean;
}

export const Navigation = ({ onboarded }: NavigationProps) => {
  const { isDarkMode } = useTheme();
  return (
    <NavigationContainer ref={RootNavigator.ref}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
      />
      <AppNavigator onboarded={onboarded} />
      <QuaiPaySnackBar />
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
      <Stack.Screen
        name="ExportStack"
        component={ExportStack}
        options={{
          title: 'ExportStack',
        }}
      />
      <Stack.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          title: 'SettingsStack',
        }}
      />
    </Stack.Navigator>
  );
};
