import React from 'react';
import WelcomeScreen from '../../screens/WelcomeScreen';
import SetupScreen from '../../screens/SetupScreen';
import LocationSetupScreen from '../../screens/LocationSetupScreen';
import LoginScreen from '../../screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="LocationSetup" component={LocationSetupScreen} />
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;
