import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';

import { SetupWalletScreen } from './screens/SetupWalletScreen';
import { SetupNameAndPFPScreen } from './screens/SetupNameAndPFPScreen';
import { SetupLocationScreen } from './screens/SetupLocationScreen';
import { LoginLandingScreen } from './screens/LoginLandingScreen';
import { LoginQRCodeScanScreen } from './screens/LoginQRCodeScanScreen';

type OnboardingStackParamList = {
  SetupWallet: undefined;
  SetupLocation: undefined;
  SetupNameAndPFP: undefined;
  LoginLanding: undefined;
  LoginQRCodeScan: undefined;
};

export type OnboardingStackNavigationProp<
  Route extends keyof OnboardingStackParamList,
> = StackNavigationProp<OnboardingStackParamList, Route>;

export type OnboardingStackScreenProps<
  Route extends keyof OnboardingStackParamList,
> = StackScreenProps<OnboardingStackParamList, Route>;

const Stack = createStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SetupWallet"
    >
      <Stack.Screen name="SetupWallet" component={SetupWalletScreen} />
      <Stack.Screen name="SetupLocation" component={SetupLocationScreen} />
      <Stack.Screen name="SetupNameAndPFP" component={SetupNameAndPFPScreen} />
      <Stack.Screen name="LoginLanding" component={LoginLandingScreen} />
      <Stack.Screen name="LoginQRCodeScan" component={LoginQRCodeScanScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
