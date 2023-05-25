import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WalletScreen } from '../../screens/MainCardScreen';
import { WalletShareScreen } from '../../screens/MainCardScreen';
import WalletRequestScreen from '../../screens/MainCardScreen/WalletRequestScreen';

type WalletStackParamList = {
  Wallet: any;
  WalletRequest: any;
  WalletShareScreen: any;
};
const Stack = createNativeStackNavigator<WalletStackParamList>();
const WalletStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Wallet">
        <Stack.Screen
          component={WalletScreen}
          options={{ headerShown: false }}
          name="Wallet"
        />
        <Stack.Screen
          name="WalletRequest"
          options={{ headerShown: false }}
          component={WalletRequestScreen}
        />
        <Stack.Screen
          component={WalletShareScreen}
          options={{ headerShown: false }}
          name="WalletShareScreen"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WalletStack;
