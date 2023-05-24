/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import '@ethersproject/shims';
import OnboardingStack from './navigation/HomeStack';
import MainStack from './navigation/MainTabStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Onboarding"
          component={OnboardingStack}
          options={{
            title: 'Onboarding',
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
