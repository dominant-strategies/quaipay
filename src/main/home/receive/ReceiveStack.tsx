import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ReceiveAmountInputScreen } from './ReceiveAmountInputScreen';

export type ReceiveStackParamList = {
  ReceiveAmountInput: { amount: string } | undefined;
};

const Stack = createNativeStackNavigator<ReceiveStackParamList>();
const ReceiveStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceiveAmountInput"
        options={{ headerShown: false }}
        component={ReceiveAmountInputScreen}
      />
    </Stack.Navigator>
  );
};

export default ReceiveStack;
