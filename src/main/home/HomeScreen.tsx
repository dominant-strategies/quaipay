import React from 'react';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { ReceiveScreen } from './receive/ReceiveScreen/';
import SendScanScreen from './send/SendScan';
import { MainTabStackScreenProps } from '../MainStack';

const TopBar = createMaterialTopTabNavigator();

const HomeScreen: React.FC<MainTabStackScreenProps<'Home'>> = () => {
  const { t } = useTranslation();

  return (
    <TopBar.Navigator initialRouteName={'Receive'}>
      <TopBar.Screen
        name="Receive"
        component={ReceiveScreen}
        options={{
          title: t('home.receive.label') ?? '',
        }}
      />
      <TopBar.Screen
        name="Send"
        component={SendScanScreen}
        options={{
          title: t('home.send.label') ?? '',
        }}
      />
    </TopBar.Navigator>
  );
};

export default HomeScreen;
