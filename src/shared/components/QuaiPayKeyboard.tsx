import React from 'react';
import { Dimensions, Pressable } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { Theme } from '../types';
import DeleteArrow from '../assets/deleteArrow.svg';
import { useThemedStyle } from 'src/shared/hooks';
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

const KeyboardButton = ({
  onPress,
  value,
  children,
}: {
  onPress: () => void;
  value?: string;
  children?: React.ReactNode;
}) => {
  const styles = useThemedStyle(themedStyle);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
    >
      {children ?? <QuaiPayText type="H2">{value}</QuaiPayText>}
    </Pressable>
  );
};

interface QuaiPayKeyboardProps {
  handleLeftButtonPress: () => void;
  handleRightButtonPress: () => void;
  onInputButtonPress: (input: string) => void;
  visible?: boolean;
}

export const QuaiPayKeyboard: React.FC<QuaiPayKeyboardProps> = ({
  handleLeftButtonPress,
  handleRightButtonPress,
  onInputButtonPress,
  visible = true,
}) => {
  const styles = useThemedStyle(themedStyle);

  const buttonOptions: Partial<Record<KeyboardButton, React.ReactNode>> = {
    leftButton: <KeyboardButton onPress={handleLeftButtonPress} value="." />,
    rightButton: (
      <KeyboardButton onPress={handleRightButtonPress}>
        <DeleteArrow />
      </KeyboardButton>
    ),
  };

  return (
    <View style={visible ? styles.keyboardContainer : styles.hidden}>
      {buttons.map(btn => (
        <View key={btn} style={styles.buttonContainer}>
          {buttonOptions[btn] || (
            <KeyboardButton
              onPress={() => onInputButtonPress(btn)}
              value={btn}
            />
          )}
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
    button: {
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90%',
    },
    hidden: {
      display: 'none',
    },
  });
