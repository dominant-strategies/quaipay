/* eslint-disable react-native/no-inline-styles */
import '@ethersproject/shims';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';

import OnboardingStack from './onboarding/OnboardingStack';
import MainStack from './main/MainStack';
import Loader from './shared/Loader';
import './shared/locales';
import ReceiveStack, {
  ReceiveStackParamList,
} from './main/home/receive/ReceiveStack';
import SendStack, { SendStackParamList } from './main/home/send/SendStack';

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  ReceiveStack: NavigatorScreenParams<ReceiveStackParamList>;
  SendStack: NavigatorScreenParams<SendStackParamList>;
};

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  // TODO: use redux persist instead of AsyncStorage
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const retrievedOnboarded = await AsyncStorage.getItem('onboarded');
      setOnboarded(retrievedOnboarded === 'true');
      setLoading(false);
    })();
  }, []);

  if (onboarded === null || loading) {
    return <Loader text={'Welcome'} />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={onboarded ? 'Main' : 'Onboarding'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingStack}
            options={{
              ...TransitionPresets.ModalPresentationIOS,
              title: 'onboarding',
            }}
          />
          <Stack.Screen
            name="Main"
            component={MainStack}
            options={{
              gestureEnabled: false,
              title: 'Main',
            }}
          />
          <Stack.Screen
            name="ReceiveStack"
            component={ReceiveStack}
            options={{
              title: 'ReceiveStack',
            }}
          />
          <Stack.Screen
            name="SendStack"
            component={SendStack}
            options={{
              title: 'SendStack',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
