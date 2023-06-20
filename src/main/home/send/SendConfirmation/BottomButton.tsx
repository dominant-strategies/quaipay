import { RootNavigator } from 'src/shared/navigation/utils';
import { QuaiPayText } from 'src/shared/components';
import { buttonStyle, styledColors } from 'src/shared/styles';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TxStatus } from 'src/main/home/send/SendConfirmation/TxStatusIndicator';

type BottomButtonProps = {
  txStatus: TxStatus;
};

export const BottomButton = ({ txStatus }: BottomButtonProps) => {
  const { t } = useTranslation();

  switch (txStatus) {
    case TxStatus.success:
      return (
        <TouchableOpacity onPress={RootNavigator.goHome} style={styles.button}>
          <QuaiPayText style={{ color: styledColors.white }} type="H3">
            {t('home.send.complete')}
          </QuaiPayText>
        </TouchableOpacity>
      );
    case TxStatus.failed:
      return (
        <TouchableOpacity
          onPress={RootNavigator.goHome}
          style={styles.retryButton}
        >
          <QuaiPayText style={{ color: styledColors.normal }} type="H3">
            {t('home.send.retry')}
          </QuaiPayText>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity
          disabled={true}
          onPress={RootNavigator.goHome}
          style={styles.disabledButton}
        >
          <QuaiPayText style={{ color: styledColors.gray }} type="H3">
            {t('home.send.complete')}
          </QuaiPayText>
        </TouchableOpacity>
      );
  }
};

const styles = StyleSheet.create({
  button: {
    ...buttonStyle.normal,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    minWidth: '96%',
    maxWidth: '96%',
    alignItems: 'center',
    paddingVertical: 16,
    maxHeight: 50,
  },
  disabledButton: {
    ...buttonStyle.gray,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    minWidth: '96%',
    maxWidth: '96%',
    alignItems: 'center',
    height: 42,
    backgroundColor: styledColors.lightGray,
    maxHeight: 50,
  },
  retryButton: {
    ...buttonStyle.white,
    height: 42,
    alignSelf: 'center',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    minWidth: '96%',
    maxWidth: '96%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: styledColors.normal,
    color: styledColors.normal,
    maxHeight: 50,
  },
});
