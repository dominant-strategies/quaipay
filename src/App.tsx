/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import '@ethersproject/shims';
import HomeStack from './navigation/HomeStack';
import MainTabStack from './navigation/MainTabStack';
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
          name="Home"
          component={HomeStack}
          options={{
            title: 'Home',
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen
          name="MainTabStack"
          component={MainTabStack}
          options={{
            title: 'MainTabStack',
            tabBarStyle: { display: 'none' },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
