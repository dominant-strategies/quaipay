import React from 'react';
import WelcomeScreen from '../../screens/WelcomeScreen';
import SetupScreen from '../../screens/SetupScreen';
import LocationSetupScreen from '../../screens/LocationSetupScreen';
import LoginScreen from '../../screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type HomeStackParamList = {
  Welcome: any;
  LocationSetup: any;
  Setup: any;
  Login: any;
};
const Stack = createNativeStackNavigator<HomeStackParamList>();
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        component={WelcomeScreen}
        options={{ headerShown: false }}
        name="Welcome"
      />
      <Stack.Screen
        name="LocationSetup"
        options={{ headerShown: false }}
        component={LocationSetupScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Setup"
        component={SetupScreen}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
