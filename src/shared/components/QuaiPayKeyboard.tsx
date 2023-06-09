import React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { Theme } from '../types';
import DeleteArrow from '../assets/deleteArrow.svg';
import { useThemedStyle } from '../hooks/useThemedStyle';
import { QuaiPayText } from './QuaiPayText';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const KEYBOARD_HEIGHT_FACTOR = WINDOW_HEIGHT > 550 ? 0.4 : 0.35;
const KEYBOARD_MAX_HEIGHT = 310;

const getKeyboardHeight: (
  customScreenHeight?: number,
) => number = customScreenHeight => {
  const screenHeight = customScreenHeight ?? WINDOW_HEIGHT;
  const proposedHeight = Math.floor(screenHeight * KEYBOARD_HEIGHT_FACTOR);

  return Math.min(proposedHeight, KEYBOARD_MAX_HEIGHT);
};

type KeyboardButton =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'leftButton'
  | '0'
  | 'rightButton';

const buttons: KeyboardButton[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'leftButton',
  '0',
  'rightButton',
];

interface QuaiPayKeyboardProps {}

export const QuaiPayKeyboard: React.FC<QuaiPayKeyboardProps> = ({}) => {
  const styles = useThemedStyle(themedStyle);

  const buttonOptions: Partial<Record<KeyboardButton, React.ReactNode>> = {
    leftButton: <QuaiPayText type="H2">.</QuaiPayText>,
    rightButton: <DeleteArrow />,
  };

  return (
    <View style={styles.keyboardContainer}>
      {buttons.map(btn => (
        <View key={btn} style={styles.buttonContainer}>
          {buttonOptions[btn] || <QuaiPayText type="H2">{btn}</QuaiPayText>}
        </View>
      ))}
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    keyboardContainer: {
      height: getKeyboardHeight(),
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderColor: theme.border,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    buttonContainer: {
      height: '25%',
      width: '30%',
      maxWidth: 420,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
