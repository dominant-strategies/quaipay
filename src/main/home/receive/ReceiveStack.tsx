/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { styledColors } from 'src/styles';

import { ReceiveAmountInputScreen } from './ReceiveAmountInputScreen';
import { ReceiveQRScreen } from './ReceiveQRScreen';

export type ReceiveStackParamList = {
  ReceiveAmountInput: undefined;
  ReceiveQR: {
    amount: number;
  };
};

const Stack = createNativeStackNavigator<ReceiveStackParamList>();

// TODO: Implement actual header layout to
//       avoid defining it on every screen
const ReceiveStack = () => {
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
    <Stack.Navigator>
      <Stack.Screen
        name="ReceiveAmountInput"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('common.request')}</Text>
          ),
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <FontAwesome5 name="chevron-left" color={textColor} size={24} />
            </Pressable>
          ),
        }}
        component={ReceiveAmountInputScreen}
      />
      <Stack.Screen
        name="ReceiveQR"
        options={{
          headerStyle: { backgroundColor },
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Text style={textStyle}>{t('common.request')}</Text>
          ),
          // TODO: fix goBack functionality
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <FontAwesome5 name="chevron-left" color={textColor} size={24} />
            </Pressable>
          ),
        }}
        component={ReceiveQRScreen}
      />
    </Stack.Navigator>
  );
};

export default ReceiveStack;
