import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  Layout,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { QuaiPayText } from './QuaiPayText';
import { useSnackBar } from '../context/snackBarContext';

const SNACK_BAR_DURATION = 3000; // 3 seconds
const SWIPE_THRESHOLD = 150;
const Z_INDEX_SNACKBAR = 10;

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface QuaiPaySnackBarProps {}

export const QuaiPaySnackBar: React.FC<QuaiPaySnackBarProps> = () => {
  const {
    isOpen,
    snackBar: { message },
    closeSnackBar,
  } = useSnackBar();
  const insets = useSafeAreaInsets();
  const translateX = useSharedValue(0);

  // Start timeout closure only if snackbar is open
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        closeSnackBar();
      }, SNACK_BAR_DURATION);

      return () => {
        timeout && clearTimeout(timeout);
      };
    }
  }, [closeSnackBar, isOpen]);

  const gestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: event => {
      if (event.translationX > SWIPE_THRESHOLD) {
        translateX.value = withSpring(SCREEN_WIDTH);
        runOnJS(closeSnackBar)();
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SWIPE_THRESHOLD], [1, 0.2]),
    transform: [
      {
        translateX: translateX.value > 0 ? translateX.value : 0,
      },
    ],
  }));

  return isOpen ? (
    <View style={[styles.container, { bottom: insets.bottom + 16 }]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          entering={FadeInDown.delay(300)}
          exiting={FadeOutDown}
          layout={Layout.easing(Easing.linear)}
          style={[styles.snackBar, animatedStyle]}
        >
          <QuaiPayText>{message + Math.random()}</QuaiPayText>
        </Animated.View>
      </PanGestureHandler>
    </View>
  ) : null;
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
