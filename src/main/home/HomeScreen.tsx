import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';

import { Theme } from 'src/shared/types';
import { useTheme } from 'src/shared/context/themeContext';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { styledColors, typography } from 'src/shared/styles';

import { ReceiveScreen } from './receive/ReceiveScreen/';
import SendScanScreen from './send/SendScan';
import { MainTabStackScreenProps } from '../MainStack';

const TopBar = createMaterialTopTabNavigator();

const HomeScreen: React.FC<MainTabStackScreenProps<'Home'>> = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const topTabBarScreenOptions = useThemedStyle(
    topTabBarScreenOptionsGenerator(isDarkMode),
  );

  return (
    <TopBar.Navigator
      screenOptions={topTabBarScreenOptions}
      initialRouteName={'Receive'}
    >
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

const topTabBarScreenOptionsGenerator =
  (isDarkMode: boolean) => (theme: Theme) =>
    ({
      tabBarStyle: {
        backgroundColor: isDarkMode ? styledColors.black : styledColors.gray,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: theme.border,
        marginBottom: 50,
        top: 40,
        position: 'absolute',
        width: '92%',
        marginLeft: 16,
      },
      tabBarItemStyle: {
        height: 40,
        paddingTop: 3,
      },
      tabBarInactiveTintColor: isDarkMode
        ? styledColors.white
        : styledColors.darkGray,
      tabBarActiveTintColor: styledColors.black,
      tabBarLabelStyle: {
        ...typography.H3,
        textTransform: 'capitalize',
      },
      tabBarIndicatorContainerStyle: {
        width: '98%', // buffer the 1% on each side
        marginHorizontal: '1%',
        paddingHorizontal: '1%',
      },
      tabBarIndicatorStyle: {
        backgroundColor: styledColors.white,
        borderRadius: 50,
        height: 34,
        marginBottom: 3,
      },
      tabBarPressColor: 'transparent',
      tabBarPressOpacity: 0.5,
    } as MaterialTopTabNavigationOptions);

export default HomeScreen;
