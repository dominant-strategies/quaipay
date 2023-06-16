/* eslint-disable react-native/no-inline-styles */
import '@ethersproject/shims';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import './shared/locales';
import { ThemeProvider } from './shared/context/themeContext';
import { Navigation } from './shared/navigation';
import { QuaiPayLoader } from 'src/shared/components';

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
    return <QuaiPayLoader text={'Welcome'} />;
  }
  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation onboarded={onboarded} />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default App;
