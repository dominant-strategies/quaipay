/* eslint-disable react-native/no-inline-styles */
import '@ethersproject/shims';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import OnboardingStack from './onboarding/OnboardingStack';
import MainStack from './main/MainStack';
import Loader from './shared/Loader';
import home_en from './shared/locales/en/home.json';
import home_de from './shared/locales/de/home.json';
import onboarding_en from './shared/locales/en/onboarding.json';
import onboarding_de from './shared/locales/de/onboarding.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: home_en,
        onboarding: onboarding_en,
      },
    },
    de: {
      translation: {
        home: home_de,
        onboarding: onboarding_de,
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}

export default App;
