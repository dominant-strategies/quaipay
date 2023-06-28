import React, { forwardRef, useEffect, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  QuaiPayBottomSheetModal,
  QuaiPaySelectableCards,
  QuaiPayText,
} from 'src/shared/components';
import { StyleSheet, View } from 'react-native';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks';
import { timeframe, txDirection } from 'src/main/wallet/WalletScreen';

type FilterModalProps = {
  setSelectedTxDirection: (
    selectedTxDirection: (typeof txDirection)[number],
  ) => void;
  setSelectedTimeframe: (selectedTimeframe: (typeof timeframe)[number]) => void;
};

export const FilterModal = forwardRef<BottomSheetModal, FilterModalProps>(
  ({ setSelectedTxDirection }, ref) => {
    const [txDirectionIndex, setTxDirectionIndex] = useState<
      number | undefined
    >();
    const [timeframeIndex, setTimeframeIndex] = useState<number | undefined>();

    useEffect(() => {
      // @ts-ignore
      setSelectedTxDirection(txDirection[txDirectionIndex]);
    }, [txDirectionIndex]);

    const styles = useThemedStyle(themedStyle);

    return (
      <QuaiPayBottomSheetModal ref={ref}>
        <View style={styles.wrapper}>
          <QuaiPayText type="H3" style={styles.title}>
            Filter
          </QuaiPayText>
          <QuaiPayText type="H3" style={styles.heading}>
            Payment Direction
          </QuaiPayText>
          <QuaiPaySelectableCards
            index={txDirectionIndex}
            options={['Payment Received', 'Payment Sent']}
            setIndex={setTxDirectionIndex}
          />
          <QuaiPayText type="H3" style={styles.heading}>
            By Date
          </QuaiPayText>
          <QuaiPaySelectableCards
            index={timeframeIndex}
            options={timeframe}
            setIndex={setTimeframeIndex}
          />
        </View>
      </QuaiPayBottomSheetModal>
    );
  },
);

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      padding: 16,
    },
    title: {
      fontSize: 16,
    },
    heading: {
      fontSize: 16,
      marginTop: 32,
      marginBottom: 8,
      textAlign: 'justify',
    },
  });
