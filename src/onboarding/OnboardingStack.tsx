import React from 'react';
import SetupWalletScreen from './screens/WelcomeScreen';
import SetupNameAndPFPScreen from './screens/SetupScreen';
import SetupLocationScreen from './screens/LocationsSetupScreen';
import LoginScreen from './screens/RecoveryScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type HomeStackParamList = {
  SetupWallet: any;
  SetupLocation: any;
  SetupNameAndPFP: any;
  Login: any;
};
const Stack = createNativeStackNavigator<HomeStackParamList>();
const OnboardingStack = () => {
  return (
    <Stack.Navigator initialRouteName="SetupWallet">
      <Stack.Screen
        component={SetupWalletScreen}
        options={{ headerShown: false }}
        name="SetupWallet"
      />
      <Stack.Screen
        name="SetupLocation"
        options={{ headerShown: false }}
        component={SetupLocationScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SetupNameAndPFP"
        component={SetupNameAndPFPScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
