import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuaiPayText } from './QuaiPayText';

interface QuaiPaySnackBarProps {
  message: string;
}

export const QuaiPaySnackBar: React.FC<QuaiPaySnackBarProps> = ({
  message,
}) => {
  return (
    <View style={styles.container}>
      <QuaiPayText>{message}</QuaiPayText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
