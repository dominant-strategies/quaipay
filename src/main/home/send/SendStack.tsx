/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { styledColors } from 'src/shared/styles';
import { Currency, Transaction } from 'src/shared/types';

import SendScanScreen from './SendScan';
import SendAmountScreen from './SendAmount';
import SendTipScreen from './SendTip';
import SendOverviewScreen from './SendOverview';
import SendConfirmationScreen from './SendConfirmation';
import Left from 'src/shared/assets/leftChevron.svg';

export type SendStackParamList = {
  SendScan: { address: string; amount: number; username: string };
  SendAmount: {
    amount: number;
    receiverAddress: string;
    receiverPFP?: string;
    receiverUsername?: string;
    sender: string;
  };
  SendTip: {
    sender: string;
    receiverAddress: string;
    receiverPFP?: string;
    receiverUsername?: string;
    input: {
      unit: Currency;
      value: string;
    };
    eqInput: {
      unit: Currency;
      value: string;
    };
    amountInUSD: string;
    amountInQUAI: string;
  };
  SendOverview: {
    receiverAddress: string;
    receiverPFP?: string;
    receiverUsername?: string;
    sender: string;
    input: {
      unit: Currency;
      value: string;
    };
    eqInput: {
      unit: Currency;
      value: string;
    };
    amountInUSD: string;
    amountInQUAI: string;
    tip: number;
    tipInUSD: string;
    totalAmount: string;
  };
  SendConfirmation: {
    transaction: Transaction;
    receiverAddress: string;
    receiverPFP?: string;
    receiverUsername?: string;
    tip: number;
    sender: string;
    input: {
      unit: Currency;
      value: string;
    };
    eqInput: {
      unit: Currency;
      value: string;
    };
  };
};

const Stack = createNativeStackNavigator<SendStackParamList>();
const SendStack = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? styledColors.black : styledColors.light;
  const textColor = isDarkMode ? styledColors.white : styledColors.black;

  const textStyle = { color: textColor, fontSize: 24 };
  const buttonStyle = { backgroundColor, marginLeft: 8, width: 30, height: 40 };

  const goBack = useCallback(
    () => (navigation.canGoBack() ? navigation.goBack() : false),
    [navigation],
  );

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SendScan"
    >
      <Stack.Screen
        component={SendScanScreen}
        options={{
          headerShown: false,
        }}
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
              <Left />
            </Pressable>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        component={SendAmountScreen}
      />
      <Stack.Screen
        name="SendTip"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        component={SendTipScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        name="SendOverview"
        component={SendOverviewScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('home.send.label')}</Text>
          ),
          headerBackTitleVisible: false,
          headerTintColor: textColor,
        }}
        name="SendConfirmation"
        component={SendConfirmationScreen}
      />
    </Stack.Navigator>
  );
};

export default SendStack;
