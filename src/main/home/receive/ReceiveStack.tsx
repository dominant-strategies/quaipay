import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

import { ReceiveAmountInputScreen } from './ReceiveAmountInputScreen';
import { ReceiveQRScreen } from './ReceiveQRScreen';
import { Wallet } from 'src/shared/types/Wallet';

export type ReceiveStackParamList = {
  ReceiveAmountInput: {
    wallet: Wallet;
  };
  ReceiveQR: {
    amount: number;
    wallet: Wallet;
  };
};

export type ReceiveStackScreenProps<Route extends keyof ReceiveStackParamList> =
  StackScreenProps<ReceiveStackParamList, Route>;

export type ReceiveStackNavigationProps<
  Route extends keyof ReceiveStackParamList,
> = StackNavigationProp<ReceiveStackParamList, Route>;

const Stack = createStackNavigator<ReceiveStackParamList>();

const ReceiveStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ReceiveAmountInput"
        component={ReceiveAmountInputScreen}
      />
      <Stack.Screen name="ReceiveQR" component={ReceiveQRScreen} />
    </Stack.Navigator>
  );
};

export default ReceiveStack;
