/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Children } from 'react';

import WelcomeScreen from './screens/WelcomeScreen';
import SetupScreen from './screens/SetupScreen';

function App(): JSX.Element {

  return (
    // <SetupScreen />
    <WelcomeScreen />
  );
}

export default App;
