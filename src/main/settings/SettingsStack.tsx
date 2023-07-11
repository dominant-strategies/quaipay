import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import { AccountDetails } from 'src/main/settings/AccountDetails';
import { Feedback, Submit } from 'src/main/settings/feedback';
import { Legal } from 'src/main/settings/Legal';
import { Notifications } from 'src/main/settings/Notifications';
import { Referral } from 'src/main/settings/Referral';

export type SettingsStackParamList = {
  AccountDetails: undefined;
  Feedback: undefined;
  SubmitFeedback: undefined;
  Legal: undefined;
  Notifications: undefined;
  Referral: undefined;
};

export type SettingsStackScreenProps<
  Route extends keyof SettingsStackParamList,
> = StackScreenProps<SettingsStackParamList, Route>;

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountDetails" component={AccountDetails} />
      <Stack.Screen name="Feedback" component={Feedback} />
      <Stack.Screen name="SubmitFeedback" component={Submit} />
      <Stack.Screen name="Legal" component={Legal} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Referral" component={Referral} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
