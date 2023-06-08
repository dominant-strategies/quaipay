import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme } from '../types';
import { useThemedStyle } from '../hooks/useThemedStyle';
import { QuaiPayText } from './QuaiPayText';

const KEYBOARD_HEIGHT = 420;

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

  return (
    <View style={styles.keyboardContainer}>
      {buttons.map(btn => (
        <View style={styles.buttonContainer}>
          <QuaiPayText type="H2" key={btn}>
            {btn}
          </QuaiPayText>
        </View>
      ))}
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    keyboardContainer: {
      height: KEYBOARD_HEIGHT,
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
