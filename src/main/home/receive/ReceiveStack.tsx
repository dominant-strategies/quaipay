import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ReceiveAmountInputScreen } from './ReceiveAmountInputScreen';
import { ReceiveQRScreen } from './ReceiveQRScreen';

export type ReceiveStackParamList = {
  ReceiveQR: undefined;
  ReceiveAmountInput: { amount: string } | undefined;
};

const Stack = createNativeStackNavigator<ReceiveStackParamList>();
const ReceiveStack = () => {
  return (
    <Stack.Navigator initialRouteName="ReceiveQR">
      <Stack.Screen
        component={ReceiveQRScreen}
        options={{ headerShown: false }}
        name="ReceiveQR"
      />
      <Stack.Screen
        name="ReceiveAmountInput"
        options={{ headerShown: false }}
        component={ReceiveAmountInputScreen}
      />
    </Stack.Navigator>
  );
};

export default ReceiveStack;
