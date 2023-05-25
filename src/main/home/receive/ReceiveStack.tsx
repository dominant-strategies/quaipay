import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ReceiveQRWithAmountScreen from './ReceiveQRWithAmount';
import ReceiveAmountInputScreen from './ReceiveAmountInputScreen';
import { ReceiveQRScreen } from './ReceiveQRScreen';

type ReceiveStackParamList = {
  ReceiveQR: any;
  ReceiveAmountInput: any;
  ReceiveQRWithAmount: any;
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
      <Stack.Screen
        options={{ headerShown: false }}
        name="ReceiveQRWithAmount"
        component={ReceiveQRWithAmountScreen}
      />
    </Stack.Navigator>
  );
};

export default ReceiveStack;
