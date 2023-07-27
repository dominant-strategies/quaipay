import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { styledColors } from 'src/shared/styles';
import React, { FC } from 'react';

type TipButtonProps = {
  isButtonSelected: boolean;
  handleTipPress: () => void;
  buttonText: string;
};

export const TipButton: FC<TipButtonProps> = ({
  isButtonSelected,
  handleTipPress,
  buttonText,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isButtonSelected && styles.selectedButton]}
      onPress={handleTipPress}
    >
      <Text
        style={{
          color: isButtonSelected ? styledColors.white : styledColors.black,
        }}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: styledColors.border,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    paddingVertical: 16,
    maxHeight: 50,
  },
  selectedButton: {
    backgroundColor: '#0066FF',
    alignSelf: 'center',
  },
});
