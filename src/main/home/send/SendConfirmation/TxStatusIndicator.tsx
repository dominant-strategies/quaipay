import Done from 'src/shared/assets/done.svg';
import RedExclamationBig from 'src/shared/assets/redExclamationBig.svg';
import LoaderCircle from 'src/shared/assets/loaderCircle.svg';
import LoaderDots from 'src/shared/assets/loaderDots.svg';
import { QuaiPayText } from 'src/shared/components';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { styledColors } from 'src/shared/styles';

export enum TxStatus {
  pending = 'pending',
  success = 'success',
  failed = 'failed',
}

type TxStatusIndicatorProps = {
  txStatus: TxStatus;
};

const AnimatedView = Animated.createAnimatedComponent(View);

export const TxStatusIndicator = ({ txStatus }: TxStatusIndicatorProps) => {
  const { t } = useTranslation();

  const rotation = useSharedValue(0);
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false,
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  // TODO: https://github.com/dominant-strategies/quaipay/pull/128#discussion_r1234770045
  switch (txStatus) {
    case TxStatus.success:
      return (
        <View style={styles.wrapper}>
          <Done />
          <QuaiPayText type="H1" style={styles.text}>
            {t('home.send.paymentConfirmed')}
          </QuaiPayText>
        </View>
      );
    case TxStatus.failed:
      return (
        <View style={styles.wrapper}>
          <RedExclamationBig />
          <QuaiPayText type="H1" style={styles.text}>
            {t('home.send.paymentFailed')}
          </QuaiPayText>
        </View>
      );
    default:
      return (
        <View style={styles.wrapper}>
          <View style={styles.loaderWrapper}>
            <AnimatedView style={[styles.loaderCircle, animatedStyle]}>
              <LoaderCircle />
            </AnimatedView>
            <View style={styles.loaderDots}>
              <LoaderDots />
            </View>
          </View>
          <QuaiPayText
            type="H1"
            style={[styles.text, { color: styledColors.gray }]}
          >
            {t('home.send.paymentPending')}
          </QuaiPayText>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 16,
  },
  wrapper: {
    alignItems: 'center',
  },
  loaderWrapper: {
    position: 'relative',
    alignItems: 'center',
    height: 100,
  },
  loaderCircle: {
    position: 'absolute',
  },
  loaderDots: {
    position: 'absolute',
  },
});
