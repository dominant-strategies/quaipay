import React, { forwardRef, useCallback, useState } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  QuaiPayBottomSheetModal,
  QuaiPaySelectableCards,
  QuaiPayText,
} from 'src/shared/components';
import { StyleSheet, TextInput, View } from 'react-native';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks';
import { styledColors } from 'src/shared/styles';
import { useTheme } from 'src/shared/context/themeContext';
import { ShardFilterMultiSelect } from 'src/main/wallet/ShardFilterMultiSelect';

export const txDirection = ['from', 'to'];
export const timeframe = [
  'All time',
  'This week',
  'Past 30 days',
  'Past 90 days',
  'Past 6 months',
  'Past year',
];

type FilterModalProps = {
  setSelectedTxDirection: (
    selectedTxDirection: (typeof txDirection)[number],
  ) => void;
  setSelectedTimeframe: (selectedTimeframe: (typeof timeframe)[number]) => void;
  setMinAmount: (minAmount: number) => void;
  setMaxAmount: (maxAmount: number) => void;
};

export const FilterModal = forwardRef<BottomSheetModal, FilterModalProps>(
  (
    {
      setSelectedTxDirection,
      setSelectedTimeframe,
      setMinAmount,
      setMaxAmount,
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const [txDirectionIndex, setTxDirectionIndex] = useState<
      number | undefined
    >();
    const [timeframeIndex, setTimeframeIndex] = useState<number | undefined>();
    const [minAmountIn, setMinAmountIn] = useState('');
    const [maxAmountIn, setMaxAmountIn] = useState('');

    const applyFilters = useCallback(() => {
      // @ts-ignore
      setSelectedTxDirection(txDirection[txDirectionIndex]);
      // @ts-ignore
      setSelectedTimeframe(timeframe[timeframeIndex]);
      setMinAmount(Number(minAmountIn));
      setMaxAmount(Number(maxAmountIn));
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
          <QuaiPayText type="H3" style={styles.heading}>
            By amount
          </QuaiPayText>
          <View style={styles.amountWrapper}>
            <TextInput
              onChangeText={setMinAmountIn}
              keyboardType="numeric"
              placeholderTextColor={theme.secondary}
              placeholder="$ Minimum"
              style={styles.amountInput}
              value={minAmountIn}
            />
            <QuaiPayText themeColor="secondary" type="bold">
              to
            </QuaiPayText>
            <TextInput
              onChangeText={setMaxAmountIn}
              keyboardType="numeric"
              placeholderTextColor={theme.secondary}
              placeholder="$ Maximum"
              style={styles.amountInput}
              value={maxAmountIn}
            />
          </View>
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
    amountInput: {
      borderColor: styledColors.lightGray,
      borderRadius: 4,
      borderWidth: 1,
      height: 40,
      padding: 8,
      width: 150,
    },
    amountWrapper: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
