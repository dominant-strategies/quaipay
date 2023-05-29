import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SendScanScreen from './SendScan';
import SendAmountScreen from './SendAmount';
import SendOverviewScreen from './SendOverview';
import SendConfirmationScreen from './SendConfirmation';

export type SendStackStackParamList = {
  SendScan: undefined;
  SendAmount: { address: string; amount?: string; username: string };
  SendOverview: undefined;
  SendConfirmation: undefined;
};

const Stack = createNativeStackNavigator<SendStackStackParamList>();
const SendStackStack = () => {
  return (
    <Stack.Navigator initialRouteName="SendScan">
      <Stack.Screen
        component={SendScanScreen}
        options={{ headerShown: false }}
        name="SendScan"
      />
      <Stack.Screen
        name="SendAmount"
        options={{ headerShown: false }}
        component={SendAmountScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SendOverview"
        component={SendOverviewScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SendConfirmation"
        component={SendConfirmationScreen}
      />
    </Stack.Navigator>
  );
};

export default SendStackStack;
