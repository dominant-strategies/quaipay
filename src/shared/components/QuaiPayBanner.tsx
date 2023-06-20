import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuaiPayText } from 'src/shared/components/QuaiPayText';
import RedExclamation from 'src/shared/assets/redExclamation.svg';
import { styledColors } from 'src/shared/styles';

type QuaiPayBannerProps = {
  boldText: string;
  showError: boolean;
  text: string;
};

export const QuaiPayBanner = ({
  boldText,
  showError,
  text,
}: QuaiPayBannerProps) => {
  return (
    <View style={[styles.wrapper, { opacity: showError ? 1 : 0 }]}>
      <RedExclamation />
      <QuaiPayText style={{ fontWeight: '700' }} themeColor="alert">
        &nbsp;{boldText}
      </QuaiPayText>
      <QuaiPayText themeColor="alert">&nbsp;{text}</QuaiPayText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: styledColors.alertBackground,
    borderColor: styledColors.alert,
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderRadius: 4,
    paddingVertical: 8,
    height: 34,
  },
});