/* eslint-disable react-native/no-inline-styles */
import '@ethersproject/shims';
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './shared/locales';
import { SnackBarProvider } from 'src/shared/context/snackBarContext';
import { ThemeProvider } from 'src/shared/context/themeContext';
import { WalletProvider } from 'src/shared/context/walletContext';
import { Navigation } from 'src/shared/navigation';
import { QuaiPayLoader } from 'src/shared/components';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { deleteOldLogFiles } from './shared/services/logging';

function App() {
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const retrievedOnboarded = await AsyncStorage.getItem('onboarded');
      setOnboarded(retrievedOnboarded === 'true');
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    deleteOldLogFiles();
  }, []);

  if (onboarded === null || loading) {
    return <QuaiPayLoader text={'Welcome'} />;
  }
  return (
    <SnackBarProvider>
      <ThemeProvider>
        <WalletProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <SafeAreaProvider>
                <Navigation onboarded={onboarded} />
              </SafeAreaProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </WalletProvider>
      </ThemeProvider>
    </SnackBarProvider>
  );
}

export default App;
