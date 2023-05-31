/* eslint-disable react-native/no-inline-styles */
import '@ethersproject/shims';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import OnboardingStack from './onboarding/OnboardingStack';
import MainStack from './main/MainStack';
import Loader from './shared/Loader';
import './shared/locales';

const Stack = createStackNavigator();

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
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
