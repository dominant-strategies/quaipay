import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
  StackNavigationProp,
} from '@react-navigation/stack';

import { ExportLandingScreen } from './ExportLandingScreen';

export type ExportStackParamList = {
  ExportLanding: undefined;
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
    </Stack.Navigator>
  );
};

export default ExportStack;
