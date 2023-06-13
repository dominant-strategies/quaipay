import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

import { ExportLandingScreen } from './ExportLandingScreen';
import { ExportPhraseScreen } from './ExportPhraseScreen';
import { ExportConfirmationPhraseScreen } from './ExportConfirmationPhraseScreen';
import { ExportCheckoutScreen } from './ExportCheckoutScreen';

export type ExportStackParamList = {
  ExportLanding: undefined;
  ExportPhrase: undefined;
  ExportConfirmationPhrase: undefined;
  ExportCheckout: undefined;
};

export type ExportStackScreenProps<Route extends keyof ExportStackParamList> =
  StackScreenProps<ExportStackParamList, Route>;

export type ExportStackNavigationProps<
  Route extends keyof ExportStackParamList,
> = StackNavigationProp<ExportStackParamList, Route>;

const Stack = createStackNavigator<ExportStackParamList>();

const ExportStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExportLanding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ExportLanding" component={ExportLandingScreen} />
      <Stack.Screen name="ExportPhrase" component={ExportPhraseScreen} />
      <Stack.Screen
        name="ExportConfirmationPhrase"
        component={ExportConfirmationPhraseScreen}
      />
      <Stack.Screen name="ExportCheckout" component={ExportCheckoutScreen} />
    </Stack.Navigator>
  );
};

export default ExportStack;
