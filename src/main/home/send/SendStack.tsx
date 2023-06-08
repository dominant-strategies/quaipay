/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, useColorScheme } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SendTipScreen from './SendTip';
import SendScanScreen from './SendScan';
import SendAmountScreen from './SendAmount';
import SendOverviewScreen from './SendOverview';
import SendConfirmationScreen from './SendConfirmation';
import { styledColors } from 'src/styles';

export type SendStackParamList = {
  SendScan: undefined;
  SendAmount: { address: string; amount?: number; username: string };
  SendTip: { address: string; amount: number; username: string };
  SendOverview: { address: string; amount: number; username: string };
  SendConfirmation: { address: string; amount: number; username: string };
};

const Stack = createNativeStackNavigator<SendStackParamList>();
const SendStack = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? styledColors.black : styledColors.light;
  const textColor = isDarkMode ? styledColors.white : styledColors.black;

  const textStyle = { color: textColor, fontSize: 24 };
  const buttonStyle = { backgroundColor, marginLeft: 8 };

  const goBack = useCallback(
    () => (navigation.canGoBack() ? navigation.goBack() : false),
    [navigation],
  );

  return (
    <Stack.Navigator initialRouteName="SendScan">
      <Stack.Screen
        component={SendScanScreen}
        options={{ headerShown: false }}
        name="SendScan"
      />
      <Stack.Screen
        name="SendAmount"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <FontAwesome5 name="chevron-left" color={textColor} size={24} />
            </Pressable>
          ),
        }}
        component={SendAmountScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <FontAwesome5 name="chevron-left" color={textColor} size={24} />
            </Pressable>
          ),
        }}
        name="SendTip"
        component={SendTipScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SendOverview"
        component={SendOverviewScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SendConfirmation"
        component={SendConfirmationScreen}
      />
    </Stack.Navigator>
  );
};

export default SendStack;
