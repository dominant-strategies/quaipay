import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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

const Stack = createNativeStackNavigator<ReceiveStackParamList>();

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
