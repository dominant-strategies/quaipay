import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SendScanScreen from './SendScan';
import SendAmountScreen from './SendAmount';
import SendOverviewScreen from './SendOverview';
import SendConfirmationScreen from './SendConfirmation';

export type SendStackParamList = {
  SendScan: undefined;
  SendAmount: { address: string; amount?: string; username: string };
  SendOverview: { address: string; amount?: string; username: string}
  SendConfirmation: { address: string; amount?: string; username: string}
};

const Stack = createNativeStackNavigator<SendStackParamList>();
const SendStack = () => {
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

export default SendStack;
