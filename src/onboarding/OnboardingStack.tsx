import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';

import { OnboardingLandingScreen } from './screens/OnboardingLandingScreen';
import { SetupNameAndPFPScreen } from './screens/SetupNameAndPFPScreen';
import { SetupLocationScreen } from './screens/SetupLocationScreen';
import { OnboardingTerms } from './screens/OnboardingTerms';
import { LoginLandingScreen } from './screens/LoginLandingScreen';
import { LoginQRCodeScanScreen } from './screens/LoginQRCodeScanScreen';
import { LoginSeedPhraseInputScreen } from './screens/LoginSeedPhraseInputScreen';
import { OnboardingReferralScanScreen } from './screens/OnboardingReferralScanScreen';

type OnboardingStackParamList = {
  OnboardingLanding: undefined;
  SetupLocation: undefined;
  SetupNameAndPFP: undefined;
  OnboardingTerms: undefined;
  LoginLanding: undefined;
  LoginQRCodeScan: undefined;
  LoginSeedPhraseInput: undefined;
  OnboardingReferralScan: undefined;
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
      initialRouteName="OnboardingLanding"
    >
      <Stack.Screen
        name="OnboardingLanding"
        component={OnboardingLandingScreen}
      />
      <Stack.Screen name="SetupLocation" component={SetupLocationScreen} />
      <Stack.Screen name="SetupNameAndPFP" component={SetupNameAndPFPScreen} />
      <Stack.Screen name="OnboardingTerms" component={OnboardingTerms} />
      <Stack.Screen name="LoginLanding" component={LoginLandingScreen} />
      <Stack.Screen name="LoginQRCodeScan" component={LoginQRCodeScanScreen} />
      <Stack.Screen
        name="LoginSeedPhraseInput"
        component={LoginSeedPhraseInputScreen}
      />
      <Stack.Screen
        name="OnboardingReferralScan"
        component={OnboardingReferralScanScreen}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
