import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { QuaiPayText } from './QuaiPayText';

const Z_INDEX_SNACKBAR = 10;

interface QuaiPaySnackBarProps {
  message: string;
}

export const QuaiPaySnackBar: React.FC<QuaiPaySnackBarProps> = ({
  message,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { bottom: insets.bottom + 16 }]}>
      <Animated.View
        entering={FadeInDown.delay(300)}
        exiting={FadeOutDown}
        layout={Layout.easing(Easing.linear)}
        style={styles.snackBar}
      >
        <QuaiPayText>{message}</QuaiPayText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
  },
  snackBar: {
    backgroundColor: 'red',
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 20,
    zIndex: 1000 + Z_INDEX_SNACKBAR,
  },
});
