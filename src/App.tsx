/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

// import WelcomeScreen from './screens/WelcomeScreen';
import SetupScreen from './screens/SetupScreen';
import '@ethersproject/shims';

function App(): JSX.Element {
  return (
    <SetupScreen />
    // <WelcomeScreen />
  );
}

export default App;
