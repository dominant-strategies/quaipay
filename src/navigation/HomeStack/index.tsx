import React from 'react';
import WelcomeScreen from '../../screens/WelcomeScreen';
// import SetupScreen from './screens/SetupScreen';
import LocationSetupScreen from '../../screens/LocationSetupScreen';
// import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type HomeStackParamList = {
  WelcomeScreen: undefined;
  LocationSetupScreen: undefined;
};
const Stack = createNativeStackNavigator<HomeStackParamList>();
const HomeStack = () => {
  return (
    <NavigationContainer children={ <></>}>
      <Stack.Navigator children={<></>} initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } />
        <Stack.Screen name="LocationSetupScreen" component={ LocationSetupScreen } />
      </Stack.Navigator>
    </NavigationContainer>
    // <WelcomeScreen />
    // <SetupScreen />
    // <LocationSetupScreen />
    // <LoginScreen />
  );
};

export default HomeStack;
