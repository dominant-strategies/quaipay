import React, { forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { QuaiPayBottomSheetModal } from 'src/shared/components/QuaiPayBottomSheetModal';
import { QuaiPayText } from 'src/shared/components';
import Done from 'src/shared/assets/done.svg';
import { StyleSheet, View } from 'react-native';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks';

export const FilterModal = forwardRef<BottomSheetModal>(({}, ref) => {
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
        <View style={[styles.selectableCard, styles.selectableCardSelected]}>
          <QuaiPayText
            type="H3"
            style={[
              styles.selectableCardText,
              styles.selectableCardTextSelected,
            ]}
          >
            Payment Received
          </QuaiPayText>
          <Done width={20} />
        </View>
        <View style={styles.selectableCard}>
          <QuaiPayText type="H3" style={styles.selectableCardText}>
            Payment Sent
          </QuaiPayText>
          <Done width={20} />
        </View>
      </View>
    </QuaiPayBottomSheetModal>
  );
});

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
    selectableCard: {
      flexDirection: 'row',
      height: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 8,
      marginVertical: 4,
    },
    selectableCardSelected: {
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.normal,
    },
    selectableCardText: {
      color: theme.secondary,
    },
    selectableCardTextSelected: {
      color: theme.normal,
    },
  });
