import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

import { ReceiveAmountInputScreen } from './ReceiveAmountInputScreen/ReceiveAmountInputScreen';
import { ReceiveAmountScreen } from 'src/main/home/receive/ReceiveAmountScreen/ReceiveAmountScreen';

export type ReceiveStackParamList = {
  ReceiveAmountInput: undefined;
  ReceiveAmount: {
    amount: number;
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
      <Stack.Screen name="ReceiveAmount" component={ReceiveAmountScreen} />
    </Stack.Navigator>
  );
};

export default ReceiveStack;
