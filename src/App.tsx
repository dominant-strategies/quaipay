import React, { useEffect, useState } from 'react';
import '@ethersproject/shims';
import OnboardingStack from './onboarding/OnboardingStack';
import MainStack from './main/MainStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Loader from './shared/Loader';

const Tab = createBottomTabNavigator();

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
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={onboarded ? 'Main' : 'Onboarding'}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Onboarding"
          component={OnboardingStack}
          options={{
            title: 'onboarding',
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen
          name="Main"
          component={MainStack}
          options={{
            title: 'Main',
            tabBarStyle: { display: 'none' },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
