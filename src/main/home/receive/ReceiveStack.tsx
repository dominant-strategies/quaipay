/* eslint-disable react/no-unstable-nested-components */
import React, { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, useColorScheme } from 'react-native';

import { styledColors } from 'src/styles';
import LeftChevron from 'src/shared/assets/leftChevron.svg';
import { ReceiveAmountInputScreen } from './ReceiveAmountInputScreen';

export type ReceiveStackParamList = {
  ReceiveAmountInput: { amount: string } | undefined;
};

const Stack = createNativeStackNavigator<ReceiveStackParamList>();

// TODO: Implement actual header layout to
//       avoid defining it on every screen
const ReceiveStack = () => {
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
          headerTitle: () => <Text style={textStyle}>Request</Text>,
          headerLeft: () => (
            <Pressable style={buttonStyle} onPress={goBack}>
              <LeftChevron />
            </Pressable>
          ),
        }}
        component={ReceiveAmountInputScreen}
      />
    </Stack.Navigator>
  );
};

export default ReceiveStack;
